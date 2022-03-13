import React, { useEffect, useState } from 'react';
import { PracticeGameInput } from '@components/practice/game/types';
import {
  MeDocument,
  MeQuery,
  MeQueryVariables,
  TestPreset,
  TestPresetAllDocument,
  TestPresetAllQuery,
  TestPresetAllQueryVariables,
  TestPresetDocument,
  TestPresetQuery,
  TestPresetQueryVariables,
  TestPresetsQuery,
  TestPresetsQueryVariables,
  User,
  UserSettings,
  useUserSettingsQuery,
} from 'generated/graphql';
import ErrorPage from 'next/error';
import { GetStaticPaths, GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { __PROD__, __URI__ } from '@utils/constants';
import LayoutCore from 'layouts/core/components/core-layout';
import { PracticeTestDetails } from '@components/practice/game/practice-test-details';
import { Flex } from '@chakra-ui/react';
import { initializeApollo } from '@modules/core/apollo/ssg-apollo';
import { useRouter } from 'next/router';
import { generateTestPresetText } from '@modules/core/practice/typing-game-utils';
import { withApollo } from '@modules/core/apollo/ssg-apollo-hoc';
import useAuth from '@contexts/UserContext';

interface PracticePlayPageProps {
  preset: TestPreset;
  date: string;
}

const PracticePlayPage: React.FC<PracticePlayPageProps> = (props) => {
  const { preset, date } = props;
  const { user } = useAuth();
  const router = useRouter();
  const { data: userSettingsData, loading: userSettingsLoading } = useUserSettingsQuery({
    variables: { input: { username: user?.username } },
    ssr: true,
  });
  const [userSettings, setUserSettings] = useState<UserSettings>();
  const [text, setText] = useState('');

  useEffect(() => {
    // We generate the text for the practice test.
    const getText = async () => {
      const generated = await generateTestPresetText(preset);
      setText(generated);
    };
    getText();
  }, [preset]);

  useEffect(() => {
    if (userSettingsData) {
      setUserSettings(userSettingsData.userSettings.userSettings);
    }
  }, [userSettingsData, userSettingsLoading]);

  return (
    <LayoutCore
      headProps={{
        seoTitle: 'Practice | Mecha Type',
        seoDescription: `Practice preset, Type: ${preset?.type}, Language: ${preset?.language}, Punctuated: ${preset?.punctuated}`,
        seoUrl: `${__URI__}/practice/play/${preset?.id}`,
      }}
    >
      This site was generated on {date}
      <Flex flexDir="column" maxWidth={['xl', '2xl', '3xl', '4xl']}>
        <Flex flexDir="column" width="100%">
          <PracticeTestDetails loading={router.isFallback} practiceTest={preset} />
        </Flex>

        {text && userSettings && (
          <PracticeGameInput
            loading={router.isFallback}
            userSettings={userSettings}
            textContent={text}
            testPreset={preset}
          />
        )}
      </Flex>
    </LayoutCore>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { locale, params } = context;
  const client = initializeApollo();

  try {
    const { data: presetData } = await client.query<TestPresetQuery, TestPresetQueryVariables>({
      query: TestPresetDocument,
      variables: {
        id: params.id as string,
      },
    });

    if (presetData.testPreset.testPreset) {
      // We found the preset.
      return {
        props: {
          locale,
          ...(await serverSideTranslations(locale ?? 'en', ['common', 'sidebar'])),
          preset: presetData?.testPreset?.testPreset,
          date: new Date().toTimeString(),
        },
        revalidate: 60,
      };
    }
  } catch (error) {
    return {
      props: {},
      notFound: true,
    };
  }
};

export const getStaticPaths: GetStaticPaths = async () => {
  // Fetch all presets.
  const client = initializeApollo();
  // TODO: Make take amount not required.
  const { data: presetsData } = await client.query<TestPresetAllQuery, TestPresetAllQueryVariables>({
    query: TestPresetAllDocument,
  });

  if (presetsData.testPresetAll.length > 0) {
    const paths = presetsData.testPresetAll.map((edge) => ({ params: { id: edge?.id } }));
    return {
      paths,
      fallback: true,
    };
  }

  return {
    fallback: true,
    paths: [],
  };
};

export default withApollo(PracticePlayPage);

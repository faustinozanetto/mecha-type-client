import React, { useEffect, useState } from 'react';
import { PracticeGameInput } from '@components/practice/game/types';
import { useMeQuery, useTestPresetQuery, useUserSettingsQuery } from 'generated/graphql';
import { useGetIDFromUrl } from '@utils/useGetIDFromUrl';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { __URI__ } from '@utils/constants';
import { generateWords } from '@modules/core/practice/typing-game-utils';
import { withApollo } from '@modules/core/apollo/apollo';
import { useRouter } from 'next/router';
import LayoutCore from 'layouts/core/components/layout-core';
import { PracticeTestDetails } from '@components/practice/game/practice-test-details';
import { Flex } from '@chakra-ui/react';

interface PracticePlayPageProps {
  locale: string;
}

const PracticePlayPage: React.FC<PracticePlayPageProps> = ({ locale }) => {
  const [text, setText] = useState('');
  const router = useRouter();
  const { data: userData, loading: userLoading } = useMeQuery({});
  const { data: testPreset, loading: testPresetLoading } = useTestPresetQuery({
    variables: {
      id: useGetIDFromUrl(),
    },
  });
  const { data: userSettings, loading: userSettingsLoading } = useUserSettingsQuery({
    variables: { input: { userId: userData?.me?.user?.id } },
  });

  useEffect(() => {
    if (testPreset?.testPreset?.testPreset) {
      setText(generateWords(testPreset?.testPreset?.testPreset).trimEnd());
    }
  }, [testPreset?.testPreset?.testPreset]);

  if (!userLoading && !userData?.me.user) {
    router.push('/auth/signin');
  }

  return (
    <LayoutCore
      user={userData?.me?.user}
      headProps={{
        seoTitle: 'Practice | Mecha Type',
        seoDescription: 'Practice play page, test your skills on a specific Preset.',
        seoUrl: `${__URI__}/practice/play/${testPreset?.testPreset?.testPreset?.id}`,
      }}
    >
      <Flex flexDir="column" maxWidth={['xl', '2xl', '3xl', '4xl']}>
        {testPreset?.testPreset?.testPreset && (
          <Flex flexDir="column" width="100%">
            <PracticeTestDetails
              loading={testPresetLoading || userLoading || text === ''}
              practiceTest={testPreset.testPreset.testPreset}
            />
          </Flex>
        )}
        {testPreset?.testPreset?.testPreset && userSettings?.userSettings?.userSettings && text && (
          <PracticeGameInput
            loading={testPresetLoading || userLoading || userSettingsLoading || text === ''}
            testPreset={testPreset.testPreset.testPreset}
            text={text as string}
            user={userData?.me?.user!}
            userSettings={userSettings.userSettings.userSettings}
          />
        )}
      </Flex>
    </LayoutCore>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { locale } = context;
  return { props: { locale, ...(await serverSideTranslations(locale ?? 'en', ['common', 'sidebar'])) } };
};

export default withApollo({})(PracticePlayPage);

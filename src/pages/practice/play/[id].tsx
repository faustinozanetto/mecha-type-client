import React, { useEffect, useState } from 'react';
import { PracticeGameInput } from '@components/practice/game/types';
import {
  TestPreset,
  TestPresetDocument,
  TestPresetQuery,
  TestPresetQueryVariables,
  TestPresetsQuery,
  TestPresetsQueryVariables,
} from 'generated/graphql';
import ErrorPage from 'next/error';
import { GetStaticPaths, GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { __URI__ } from '@utils/constants';
import LayoutCore from 'layouts/core/components/core-layout';
import { PracticeTestDetails } from '@components/practice/game/practice-test-details';
import { Flex } from '@chakra-ui/react';
import { initializeApollo } from '@modules/core/apollo/ssg-apollo';
import { useRouter } from 'next/router';
import { gql } from '@apollo/client';
import { generateTestPresetText } from '@modules/core/practice/typing-game-utils';

interface PracticePlayPageProps {
  preset: TestPreset;
}

const PracticePlayPage: React.FC<PracticePlayPageProps> = (props) => {
  const { preset } = props;
  const router = useRouter();
  const [text, setText] = useState('');

  useEffect(() => {
    // We generate the text for the practice test.
    const getText = async () => {
      const generated = await generateTestPresetText(preset);
      setText(generated);
    };
    getText();
  }, []);

  if (router.isFallback) {
    return <h1>Loading...</h1>;
  }

  if (!preset) {
    return <ErrorPage statusCode={404} />;
  }
  return (
    <LayoutCore
      headProps={{
        seoTitle: 'Practice | Mecha Type',
        seoDescription: `Practice preset, Type: ${preset.type}, Language: ${preset.language}, Punctuated: ${preset.punctuated}`,
        seoUrl: `${__URI__}/practice/play/${preset?.id}`,
      }}
    >
      <Flex flexDir="column" maxWidth={['xl', '2xl', '3xl', '4xl']}>
        <Flex flexDir="column" width="100%">
          <PracticeTestDetails loading={preset === null} practiceTest={preset} />
        </Flex>

        {text && <PracticeGameInput loading={preset === null} textContent={text} testPreset={preset} />}
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
        },
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

  const QUERY = gql`
    query testPresets($input: TestPresetsFindInput!) {
      testPresets(input: $input) {
        edges {
          node {
            id
          }
        }
      }
    }
  `;

  // TODO: Make take amount not required.
  const { data: presetsData } = await client.query<TestPresetsQuery, TestPresetsQueryVariables>({
    query: QUERY,
    variables: { input: { take: 50000, skip: 0, where: {} } },
  });

  if (presetsData.testPresets.edges.length > 0) {
    const paths = presetsData.testPresets.edges.map((edge) => ({ params: { id: edge.node.id } }));
    return {
      paths,
      fallback: false,
    };
  }

  return {
    fallback: 'blocking',
    paths: [],
  };
};

export default PracticePlayPage;

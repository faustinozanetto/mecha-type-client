import React from 'react';
import { PracticeGameInput } from '@components/practice/game/types';
import { TestPreset, TestPresetDocument, TestPresetQuery, TestPresetQueryVariables } from 'generated/graphql';
import ErrorPage from 'next/error';
import { GetStaticPaths, GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { __URI__ } from '@utils/constants';
import { withApollo } from '@modules/core/apollo/ssg-apollo-hoc';
import LayoutCore from 'layouts/core/components/core-layout';
import { PracticeTestDetails } from '@components/practice/game/practice-test-details';
import { Flex } from '@chakra-ui/react';
import CoreLayoutHead from 'layouts/core/components/core-layout-head';
import { initializeApollo } from '@modules/core/apollo/ssg-apollo';
import { useRouter } from 'next/router';

interface PracticePlayPageProps {
  preset: TestPreset;
}

const PracticePlayPage: React.FC<PracticePlayPageProps> = (props) => {
  const { preset } = props;
  const router = useRouter();

  if (router.isFallback) {
    return <h1>Loading...</h1>;
  }

  if (!preset) {
    return <ErrorPage statusCode={404} />;
  }
  return (
    <LayoutCore
      head={CoreLayoutHead}
      stickyFooter={true}
      headProps={{
        seoTitle: 'Practice | Mecha Type',
        seoDescription: 'Practice play page, test your skills on a specific Preset.',
        seoUrl: `${__URI__}/practice/play/${preset?.id}`,
      }}
    >
      <Flex flexDir="column" maxWidth={['xl', '2xl', '3xl', '4xl']}>
        <Flex flexDir="column" width="100%">
          <PracticeTestDetails loading={preset === null} practiceTest={preset} />
        </Flex>

        <PracticeGameInput loading={preset === null} testPreset={preset} />
      </Flex>
    </LayoutCore>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { locale, params } = context;
  const client = initializeApollo();

  try {
    const { data: presetData, networkStatus } = await client.query<TestPresetQuery, TestPresetQueryVariables>({
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
  return {
    fallback: 'blocking',
    paths: [],
  };
};

export default withApollo(PracticePlayPage);

import React, { useEffect, useState } from 'react';
import { PracticeGameInput } from '@components/practice/game/types';
import { TestPresetFragment, UserFragment, useTestPresetQuery } from 'generated/graphql';
import { useGetIDFromUrl } from '@utils/useGetIDFromUrl';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { __URI__ } from '@utils/constants';
import { withApollo } from '@modules/core/apollo/apollo';

import LayoutCore from 'layouts/core/components/layout-core';
import { PracticeTestDetails } from '@components/practice/game/practice-test-details';
import { Flex } from '@chakra-ui/react';

interface PracticePlayPageProps {
  /** Data containing the user info of the current logged in user. */
  me: UserFragment;
}

const PracticePlayPage: React.FC<PracticePlayPageProps> = ({ me }) => {
  const [testPreset, setTestPreset] = useState<TestPresetFragment>();
  const { data: testPresetData, loading: testPresetLoading } = useTestPresetQuery({
    variables: {
      id: useGetIDFromUrl(),
    },
  });

  // Test Preset
  useEffect(() => {
    if (testPresetData?.testPreset?.testPreset && !testPresetLoading) {
      setTestPreset(testPresetData.testPreset.testPreset);
    }
  }, [testPresetData?.testPreset?.testPreset, testPresetLoading]);

  return (
    <LayoutCore
      user={me}
      headProps={{
        seoTitle: 'Practice | Mecha Type',
        seoDescription: 'Practice play page, test your skills on a specific Preset.',
        seoUrl: `${__URI__}/practice/play/${testPreset?.id}`,
      }}
    >
      <Flex flexDir="column" maxWidth={['xl', '2xl', '3xl', '4xl']}>
        {testPreset && (
          <Flex flexDir="column" width="100%">
            <PracticeTestDetails loading={testPresetLoading} practiceTest={testPreset} />
          </Flex>
        )}
        {testPreset && <PracticeGameInput loading={testPresetLoading} testPreset={testPreset} user={me} />}
      </Flex>
    </LayoutCore>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { locale } = context;
  return { props: { locale, ...(await serverSideTranslations(locale ?? 'en', ['common', 'sidebar'])) } };
};

export default withApollo({})(PracticePlayPage);

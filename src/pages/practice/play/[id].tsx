import React, { useEffect, useState } from 'react';
import { PracticeGameInput } from '@components/practice/game/types';
import { TestPresetFragment, useMeQuery, UserFragment, useTestPresetQuery } from 'generated/graphql';
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
  const router = useRouter();
  const [text, setText] = useState('');
  const [me, setMe] = useState<UserFragment>();
  const [testPreset, setTestPreset] = useState<TestPresetFragment>();
  const { data: meUserData, loading: meLoading } = useMeQuery({});
  const { data: testPresetData, loading: testPresetLoading } = useTestPresetQuery({
    variables: {
      id: useGetIDFromUrl(),
    },
  });

  // Me data
  useEffect(() => {
    if (meUserData?.me?.user && !meLoading) {
      setMe(meUserData.me.user);
    }
  }, [meUserData]);

  // Test Preset
  useEffect(() => {
    if (testPresetData?.testPreset?.testPreset && !testPresetLoading) {
      setTestPreset(testPresetData.testPreset.testPreset);
    }
  }, [testPresetData?.testPreset?.testPreset, testPresetLoading]);

  // Test Preset Text
  useEffect(() => {
    setText(generateWords(testPreset).trimEnd());
  }, [testPreset]);

  if (!meLoading && !me && !meUserData?.me?.user) {
    router.push('/auth/signin');
  }

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
            <PracticeTestDetails loading={testPresetLoading || meLoading || text === ''} practiceTest={testPreset} />
          </Flex>
        )}
        {testPreset && text && (
          <PracticeGameInput
            loading={testPresetLoading || meLoading || text === ''}
            testPreset={testPreset}
            text={text as string}
            user={me}
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

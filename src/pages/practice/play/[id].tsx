import React, { useEffect, useState } from 'react';
import { PracticeGameInput } from '@components/practice/game/types';
import { useMeQuery, User, useTestPresetQuery } from 'generated/graphql';
import { PageWrapper } from '@components/wrappers/page-wrapper';
import { useGetIDFromUrl } from '@utils/useGetIDFromUrl';
import { Container } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { __URI__ } from '@utils/constants';
import { NextSeo } from 'next-seo';
import { generateWords } from '@modules/core/practice/typing-game-utils';
import withApollo from '@modules/core/apollo/apollo';
import useMechaStore from 'state/store';
import { NotFoundError } from '@components/not-found';
import { useRouter } from 'next/router';

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
  const practiceConfig = useMechaStore((state) => state.practiceConfig);

  useEffect(() => {
    if (testPreset?.testPreset?.testPreset) {
      setText(generateWords(testPreset?.testPreset?.testPreset, practiceConfig.punctuateWords).trimEnd());
    }
  }, [testPreset?.testPreset.testPreset]);

  if (!userLoading && !userData?.me.user) {
    router.push('/auth/signin');
  }

  return (
    <PageWrapper user={userData?.me?.user as User}>
      <NextSeo
        title={`Practice | Mecha Type`}
        description={`Practice play page, test your skills on a specific Preset.`}
        canonical={`${__URI__}/practice/play/${testPreset?.testPreset?.testPreset?.id}`}
        openGraph={{
          type: 'website',
          images: [{ url: '/favicon.ico' }],
          locale: locale,
          url: `${__URI__}/practice/play/${testPreset?.testPreset?.testPreset?.id}`,
          site_name: 'Mecha Type',
        }}
      />
      <Container
        maxW={['1xl', '2xl', '3xl', '4xl']}
        paddingTop="1rem"
        paddingBottom="1rem"
        minHeight="calc(100vh - 10rem)"
        centerContent
      >
        {text && !testPresetLoading && (
          <PracticeGameInput
            loading={testPresetLoading || userLoading}
            testPreset={testPreset.testPreset.testPreset}
            text={text as string}
            user={userData?.me?.user!}
          />
        )}
      </Container>
    </PageWrapper>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { locale } = context;
  return { props: { locale, ...(await serverSideTranslations(locale ?? 'en', ['common', 'sidebar'])) } };
};

export default withApollo({})(PracticePlayPage);

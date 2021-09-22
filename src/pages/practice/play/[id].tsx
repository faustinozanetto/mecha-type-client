import React, { useEffect, useState } from 'react';
import { withApollo } from '@lib/apollo';
import { PracticeGameInput } from '@components/practice/game/types';
import { generateWords } from '@lib/words/helperFunctions';
import { useMeQuery, User, useTestPresetQuery } from 'generated/graphql';
import { PageWrapper } from '@components/wrappers/page-wrapper';
import { useGetIDFromUrl } from '@utils/useGetIDFromUrl';
import { Container } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { __URI__ } from '@utils/constants';
import { NextSeo } from 'next-seo';

interface PracticePlayPageProps {
  locale: string;
}

const PracticePlayPage: React.FC<PracticePlayPageProps> = ({ locale }) => {
  const [text, setText] = useState('');
  const { data: userData, loading } = useMeQuery({});

  const { data: testPreset } = useTestPresetQuery({
    variables: {
      id: useGetIDFromUrl(),
    },
  });

  useEffect(() => {
    if (testPreset?.testPreset?.testPreset) {
      setText(generateWords(testPreset?.testPreset?.testPreset));
    }
  }, [userData, testPreset]);

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
        {text && testPreset?.testPreset?.testPreset && (
          <PracticeGameInput
            loading={loading}
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
  return { props: { locale, ...(await serverSideTranslations(locale ?? 'en', ['common'])) } };
};

export default withApollo({ ssr: false })(PracticePlayPage);

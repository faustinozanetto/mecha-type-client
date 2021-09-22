import React from 'react';
import  withApollo from '@lib/apollo';
import { PracticePresetSelection } from '@components/practice/selection';
import { PageWrapper } from '@components/wrappers/page-wrapper';
import { useMeQuery, User } from '@generated/graphql';
import { GetServerSideProps, GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Container } from '@chakra-ui/react';
import { __URI__ } from '@utils/constants';
import { NextSeo } from 'next-seo';

interface PracticePageProps {
  locale: string;
}

const PracticePage: React.FC<PracticePageProps> = ({ locale }) => {
  const { data: userData, loading } = useMeQuery({});

  return (
    <PageWrapper user={userData?.me?.user as User}>
      <NextSeo
        title={`Practice | Mecha Type`}
        description={`Practice page where you can choose to use a created preset, or create one.`}
        canonical={`${__URI__}/practice`}
        openGraph={{
          type: 'website',
          images: [{ url: '/favicon.ico' }],
          locale: locale,
          url: `${__URI__}/practice`,
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
        <PracticePresetSelection user={userData?.me?.user!} />
      </Container>
    </PageWrapper>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { locale } = context;
  return { props: { locale, ...(await serverSideTranslations(locale ?? 'en', ['common', 'sidebar'])) } };
};

export default withApollo({ ssr: false })(PracticePage);

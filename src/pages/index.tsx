import React from 'react';
import withApollo from '@lib/apollo';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetServerSideProps, GetStaticProps } from 'next';
import { PageWrapper } from '@components/wrappers/page-wrapper';
import { useRouter } from 'next/router';
import { Container, Heading } from '@chakra-ui/react';
import { __URI__ } from '@utils/constants';
import { NextSeo } from 'next-seo';
import { useMeQuery } from '@generated/graphql';
import { Loading } from '@components/loading/loading';

interface IHomeProps {
  locale: string;
}

const Home: React.FC<IHomeProps> = ({ locale }) => {
  const { t } = useTranslation('common');
  const router = useRouter();
  const { data: userData, loading } = useMeQuery({
    ssr: true,
  });

  if (loading) {
    return <Loading />;
  }

  return (
    <PageWrapper user={userData?.me?.user!}>
      <NextSeo
        title={`Home | Mecha Type`}
        description={`Homepage for Mecha Type, usually shows information about updates and news.`}
        canonical={`${__URI__}`}
        openGraph={{
          type: 'website',
          images: [{ url: '/favicon.ico' }],
          locale: locale,
          url: `${__URI__}`,
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
        <Heading as="h1" fontWeight={700}>
          Welcome to Mecha Type
        </Heading>
        <Heading as="h2" fontSize="2xl">
          {t('test')}
        </Heading>
        <Heading as="h3">v0.0.5</Heading>
      </Container>
    </PageWrapper>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { locale } = context;

  return { props: { locale, ...(await serverSideTranslations(locale ?? 'en', ['common', 'sidebar'])) } };
};

export default withApollo({ ssr: false })(Home);

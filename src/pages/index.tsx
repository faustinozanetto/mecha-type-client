import React from 'react';
import Link from 'next/link';
import withApollo from '@lib/apollo';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetServerSideProps } from 'next';
import { PageWrapper } from '@components/wrappers/page-wrapper';
import { useRouter } from 'next/router';
import { Container } from '@chakra-ui/react';
import { __URI__ } from '@utils/constants';
import { NextSeo } from 'next-seo';
import { useSession } from 'next-auth/react';
import { useUserQuery } from '@generated/graphql';
import { Loading } from '@components/loading/loading';

interface IHomeProps {
  locale: string;
}

const Home: React.FC<IHomeProps> = ({ locale }) => {
  const { t } = useTranslation('common');
  const router = useRouter();
  const { data: session, status } = useSession();
  const { data, loading: userLoading } = useUserQuery({
    variables: {
      where: {
        email: session?.user?.email,
      },
    },
  });

  if (status === 'loading') {
    return <Loading />;
  }

  return (
    <PageWrapper user={data?.user?.user!}>
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
        maxW={['1xl, 2xl, 3xl, 4xl']}
        paddingTop="1rem"
        paddingBottom="1rem"
        minHeight="calc(100vh - 10rem)"
        centerContent
      >
        <h1>Welcome to Mecha Type</h1>
        <h1>{t('test')}</h1>

        <Link href="/" locale={router.locale === 'en' ? 'es' : 'en'} passHref>
          <button>{t('change-locale')}</button>
        </Link>
        <h2>v0.0.4</h2>
      </Container>
    </PageWrapper>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { locale } = context;

  return { props: { locale, ...(await serverSideTranslations(locale ?? 'en', ['common'])) } };
};

export default withApollo()(Home);

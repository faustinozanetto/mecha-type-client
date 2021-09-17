import React, { useEffect, useState } from 'react';
import withApollo from '@lib/apollo';
import { PracticeGameInput } from '@components/practice/game/types';
import { generateWords } from '@lib/words/helperFunctions';
import { User, useTestPresetQuery, useUserQuery } from 'generated/graphql';
import { PageWrapper } from '@components/wrappers/page-wrapper';
import { useIsAuth } from '@utils/useIsAuth';
import { useGetIDFromUrl } from '@utils/useGetIDFromUrl';
import { Container } from '@chakra-ui/react';
import { NotFoundError } from '@components/not-found';
import { Session } from 'next-auth';
import { getSession } from 'next-auth/react';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { __URI__ } from '@utils/constants';
import { NextSeo } from 'next-seo';

interface PracticePlayPageProps {
  session: Session;
  locale: string;
}

const PracticePlayPage: React.FC<PracticePlayPageProps> = ({ session, locale }) => {
  useIsAuth();
  const [text, setText] = useState('');

  const { data, loading: userLoading } = useUserQuery({
    variables: {
      where: {
        email: session?.user?.email,
      },
    },
  });

  const { data: testPreset, loading } = useTestPresetQuery({
    variables: {
      id: useGetIDFromUrl(),
    },
  });

  useEffect(() => {
    if (testPreset?.testPreset?.testPreset && !loading) {
      setText(generateWords(testPreset.testPreset.testPreset));
    }
  }, [loading, testPreset?.testPreset]);

  if (!userLoading && !data?.user) {
    return <NotFoundError />;
  }

  return (
    <PageWrapper user={data?.user.user as User}>
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
        {!loading && text && (
          <PracticeGameInput
            loading={loading || userLoading}
            testPreset={testPreset?.testPreset?.testPreset!}
            text={text as string}
            user={data?.user.user as User}
          />
        )}
      </Container>
    </PageWrapper>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { locale } = context;
  const session = await getSession(context);

  if (!session) {
    return { props: { locale, ...(await serverSideTranslations(locale ?? 'en', ['common'])) } };
  }

  return { props: { locale, session, ...(await serverSideTranslations(locale ?? 'en', ['common'])) } };
};

export default withApollo()(PracticePlayPage);

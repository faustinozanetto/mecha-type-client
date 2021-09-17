import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { User, useUserQuery } from 'generated/graphql';
import { GetServerSideProps } from 'next';
import { PageWrapper } from '@components/wrappers/page-wrapper';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useSession } from 'next-auth/react';
import { Container } from '@chakra-ui/react';
import { NextSeo } from 'next-seo';
import { __URI__ } from '@utils/constants';
import withApollo from '@lib/apollo';
import { useRouter } from 'next/router';
import { NotFoundError } from '@components/not-found';

const UserProfile = dynamic(() => import('@components/user/profile/page/user/user-profile'));

export type CountryEntry = {
  name: string;
  flag: string;
};

interface UserPageProps {
  /** Countries data */
  countries: CountryEntry[];
}

const UserPage: React.FC<UserPageProps> = ({ countries }) => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [IDFromRoute, _setIDFromRoute] = useState(router.query.id as string);
  const [userOwnsPage, setUserOwnsPage] = useState(false);
  const { data, loading: userLoading } = useUserQuery({
    skip: status === 'loading',
    ssr: true,
    variables: {
      where: {
        email: session?.user?.email,
      },
    },
  });

  const { data: targetUser, loading: targetUserLoading } = useUserQuery({
    skip: IDFromRoute === '',
    variables: {
      where: {
        name: IDFromRoute,
      },
    },
  });

  useEffect(() => {
    /** Check if the current logged user matches the target user. */
    const userOwnsPage = (): boolean => {
      if (data?.user?.user && targetUser?.user?.user) {
        return data.user.user.id === targetUser.user.user.id;
      }
      return false;
    };
    setUserOwnsPage(userOwnsPage());
  }, [targetUser?.user, data?.user]);

  if (!targetUserLoading && !targetUser?.user.user) {
    return <NotFoundError />;
  }

  return (
    <PageWrapper user={data?.user?.user!}>
      <NextSeo
        title={`${targetUser?.user?.user?.name ?? IDFromRoute} | Mecha Type`}
        description={`${
          targetUser?.user?.user?.name ?? IDFromRoute
        }´s profile page, showing their stats and more information.`}
        canonical={`${__URI__!}/user/${targetUser?.user?.user?.name}`}
        openGraph={{
          type: 'website',
          images: [{ url: targetUser?.user?.user?.image!, alt: `${targetUser?.user?.user?.name!} Profile Picture` }],
          locale: 'en_US',
          url: `${__URI__!}/user/${targetUser?.user?.user?.name}`,
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
        <UserProfile
          user={data?.user.user as User}
          targetUser={targetUser?.user.user as User}
          loading={userLoading && targetUserLoading && status === 'loading'}
          ownsPage={userOwnsPage}
          session={session!}
          countries={countries}
        />
      </Container>
    </PageWrapper>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { locale } = context;
  let names: CountryEntry[] = [];
  try {
    const res = await fetch('https://restcountries.eu/rest/v2/all');
    const data = await res.json();
    data.map((country: any) => {
      names.push({ name: country.name, flag: country.alpha2Code });
    });
  } catch {}

  return { props: { countries: names, ...(await serverSideTranslations(locale ?? 'en', ['user-profile'])) } };
};

export default withApollo()(UserPage);

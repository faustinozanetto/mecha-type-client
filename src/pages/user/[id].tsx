import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { User, useUserQuery } from 'generated/graphql';
import { GetServerSideProps } from 'next';
import { PageWrapper } from '@components/wrappers/page-wrapper';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Container } from '@chakra-ui/react';
import { NextSeo } from 'next-seo';
import { __URI__ } from '@utils/constants';
import withApollo from '@lib/apollo';
import { useRouter } from 'next/router';
import { generateAvatarURl } from '@lib/user/userHelper';
import useSession from '@hooks/user/useSession';

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
  const { data, loading } = useSession();
  const [IDFromRoute, _setIDFromRoute] = useState(router.query.id as string);
  const [userOwnsPage, setUserOwnsPage] = useState(false);
  const { data: userData, loading: userLoading } = useUserQuery({
    variables: {
      where: {
        id: data?.id,
      },
    },
  });

  const { data: targetUser, loading: targetUserLoading } = useUserQuery({
    skip: IDFromRoute === '',
    variables: {
      where: {
        username: IDFromRoute,
      },
    },
  });

  useEffect(() => {
    /** Check if the current logged user matches the target user. */
    const userOwnsPage = (): boolean => {
      if (userData?.user?.user && targetUser?.user?.user) {
        return userData.user.user.id === targetUser.user.user.id;
      }
      return false;
    };
    setUserOwnsPage(userOwnsPage());
  }, [targetUser?.user, userData?.user]);

  return (
    <PageWrapper user={userData?.user?.user!}>
      <NextSeo
        title={`${targetUser?.user?.user?.username ?? IDFromRoute} | Mecha Type`}
        description={`${
          targetUser?.user?.user?.username ?? IDFromRoute
        }´s profile page, showing their stats and more information.`}
        canonical={`${__URI__!}/user/${targetUser?.user?.user?.username}`}
        openGraph={{
          type: 'website',
          images: [
            {
              url: generateAvatarURl(targetUser?.user?.user!),
              alt: `${targetUser?.user?.user?.username!} Profile Picture`,
            },
          ],
          locale: 'en_US',
          url: `${__URI__!}/user/${targetUser?.user?.user?.username}`,
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
          user={userData?.user.user as User}
          targetUser={targetUser?.user.user as User}
          loading={userLoading && targetUserLoading && loading}
          ownsPage={userOwnsPage}
          session={data!}
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

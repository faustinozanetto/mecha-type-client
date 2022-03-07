import React, { useEffect, useState } from 'react';
import UserProfile from '@components/user/profile/page/user/user-profile';
import LayoutCore from 'layouts/core/components/core-layout';
import { User } from 'generated/graphql';
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { __URI__ } from '@utils/constants';
import { useRouter } from 'next/router';
import { generateAvatarURl, generateParsedStats, UserParsedStats } from '@modules/core/user/user';
import { CountryEntry } from '@typings/user.types';
import CoreLayoutHead from 'layouts/core/components/core-layout-head';
import useAuth from '@contexts/UserContext';
import { withApollo } from '@modules/core/apollo/ssg-apollo-hoc';
import { gql } from '@apollo/client';
import { initializeApollo } from '@modules/core/apollo/ssg-apollo';

interface UserPageProps {
  /** Countries data */
  countries: CountryEntry[];
  targetUser: User;
  parsedStats: UserParsedStats;
}

const UserPage: React.FC<UserPageProps> = ({ countries, targetUser, parsedStats }) => {
  const router = useRouter();
  const usernameURI = router.query.name as string;
  const { user: loggedInUser } = useAuth();
  const [userOwnsPage, setUserOwnsPage] = useState(false);
  /*
  const {
    data: targetUserData,
    loading: targetUserLoading,
    called,
  } = useUserQuery({
    variables: {
      where: {
        username: usernameURI,
      },
    },
    skip: !loggedInUser || usernameURI === loggedInUser?.username,
  });
  */

  /*
  // Target User
  useEffect(() => {
    if (targetUserData?.user?.user) {
      setTargetUser(targetUserData.user.user);
    }
  }, [targetUserData, targetUserLoading]);

  useEffect(() => {
    // If we skipped target user query
    if (!loggedInUser || usernameURI === loggedInUser?.username) {
      setTargetUser(loggedInUser);
    }
  }, [called, loggedInUser, usernameURI]);
  */

  /** Check if the current logged user matches the target user. */
  useEffect(() => {
    if (loggedInUser && targetUser) {
      setUserOwnsPage(loggedInUser.username === usernameURI);
    }
  }, [targetUser, usernameURI, loggedInUser]);

  return (
    <LayoutCore
      head={CoreLayoutHead}
      headProps={{
        seoTitle: `${targetUser?.username ?? usernameURI} | Mecha Type`,
        seoDescription: `${
          targetUser?.username ?? usernameURI
        }´s profile page, showing their stats and more information.`,
        seoUrl: `${__URI__!}/user/${targetUser?.username}`,
        seoCanonicalUrl: `${__URI__!}/user`,
        seoImage: generateAvatarURl(targetUser),
      }}
    >
      {targetUser && (
        <UserProfile
          user={loggedInUser}
          targetUser={targetUser}
          loading={false}
          ownsPage={userOwnsPage}
          parsedStats={parsedStats}
          countries={countries}
        />
      )}
    </LayoutCore>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const QUERY = gql`
    query users($take: Int!) {
      users(take: $take) {
        users {
          id
          username
        }
        errors {
          field
          message
        }
      }
    }
  `;
  const client = initializeApollo();
  const { data: users } = await client.query({
    query: QUERY,
    variables: {
      take: 1000,
    },
  });

  const paths = users.users.users.map((user) => {
    return {
      params: { name: user.username },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { locale, params } = context;
  const userQuery = gql`
    query user($where: UserWhereInput!) {
      user(where: $where) {
        user {
          id
          oauthId
          username
          description
          avatar
          country
          badge
          authProvider
        }
        errors {
          field
          message
        }
      }
    }
  `;
  const historyQuery = gql`
    query userTestPresetsHistory($input: UserTestPresetsHistoryInput!) {
      userTestPresetsHistory(input: $input) {
        testPresetHistory {
          id
          userId
          testPresetId
          wpm
          cpm
          accuracy
          keystrokes
          correctChars
          incorrectChars
          createdAt
          updatedAt
        }
        errors {
          field
          message
        }
      }
    }
  `;
  const client = initializeApollo();
  const { data: userData } = await client.query({
    query: userQuery,
    variables: {
      where: { username: params.name as string },
    },
  });
  const { data: historyData } = await client.query({
    query: historyQuery,
    variables: {
      input: {
        username: params.name as string,
      },
    },
  });
  console.log(params.name);
  console.log(historyData.userTestPresetsHistory.testPresetHistory);
  let names: CountryEntry[] = [];

  await fetch('https://restcountries.com/v3.1/all')
    .then((response) => response.json())
    .then((data) =>
      data.map((country) => {
        names.push({ name: country.name.common, flag: country.flags.svg });
      })
    );

  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['user-profile', 'sidebar'])),
      countries: names ?? [],
      targetUser: userData.user.user,
      parsedStats: generateParsedStats(historyData.userTestPresetsHistory.testPresetHistory),
    },
  };
};

export default withApollo(UserPage);

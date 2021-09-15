/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
import Head from 'next/head';
import { useIsAuth } from '@utils/useIsAuth';
import { PageWrapper } from '@components/wrappers/page-wrapper';
import { getSession } from 'next-auth/react';
import { UserDashboard } from '@components/dashboard';
import { User, useUserQuery } from 'generated/graphql';
import withApollo from '@lib/apollo';
import { Session } from 'next-auth';
import { GetServerSideProps } from 'next';
import { Loading } from '@components/loading/loading';
import { Container } from '@chakra-ui/react';

interface DashboardPageProps {
  /** Session object gathered from server side props */
  session: Session;
}

export interface IPositionEntry {
  // fieldType: FilterBy;
  position: number;
  amount: number;
  total: number;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ session }) => {
  useIsAuth();
  const [filteredUserStats, setFilteredUserStats] = useState<IPositionEntry[]>([]);
  // const { data: sortedUsers, loading } = useSortUsersByFieldsQuery();
  const { data: user, loading: userLoading } = useUserQuery({
    variables: {
      where: { email: session?.user?.email },
    },
  });

  // useEffect(() => {
  //   if (sortedUsers?.sortUsersByFields?.filteredUsers) {
  //     const newState = [];
  //     // Looping through all the valid filter by options.
  //     for (const sortedUser of sortedUsers.sortUsersByFields.filteredUsers) {
  //       // Creating user pos var
  //       let userPos = 0;
  //       // Finding the current user position by filtering the users array.
  //       const matchingUser = sortedUser.users.filter((u) => {
  //         if (u.id === user?.user?.id) {
  //           userPos = sortedUser.users.indexOf(u) + 1;
  //           return u;
  //         }
  //       });

  //       // Getting the corresponding field type amount of the user.
  //       const getFieldAmount = (fieldType: FilterBy, user: FilteredUser): number => {
  //         if (!user) return 0;
  //         switch (fieldType) {
  //           case FilterBy.AverageWpm: {
  //             // TODO: add support for average wpm
  //             return 0;
  //           }
  //           case FilterBy.Keystrokes: {
  //             return user.keystrokes!;
  //           }
  //           case FilterBy.TestsCompleted: {
  //             return user.testsCompleted!;
  //           }
  //           case FilterBy.WordsWritten: {
  //             return user.wordsWritten!;
  //           }
  //         }
  //       };

  //       // Pushing the data to the state array.
  //       newState.push({
  //         fieldType: sortedUser?.filterBy,
  //         position: userPos,
  //         // TODO: fix get field amount
  //         // amount: getFieldAmount(sortedUser?.filterBy, matchingUser[0]),
  //         amount: 0,
  //         total: sortedUsers.sortUsersByFields.totalUsers,
  //       });
  //     }
  //     // Setting the state.
  //     setFilteredUserStats(newState);
  //   }
  // }, [loading, userLoading]);

  if (userLoading || !user?.user) {
    return <Loading />;
  }

  return (
    <PageWrapper user={user?.user! as User}>
      <Head>
        <title>Dashboard | Mecha Type</title>
        <meta name="description" content="The best place to improve your writing skills and have fun!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container
        maxW={['1xl', '2xl', '3xl', '4xl']}
        paddingTop="1rem"
        paddingBottom="1rem"
        minHeight="calc(100vh - 10rem)"
        centerContent
      >
        <UserDashboard user={user.user as User} userStats={filteredUserStats} />
      </Container>
    </PageWrapper>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  if (!session) {
    return { props: {} };
  }
  return { props: { session } };
};

export default withApollo(DashboardPage);

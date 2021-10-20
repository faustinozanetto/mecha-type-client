import React, { useEffect, useState } from 'react';
import { useFilterUsersQuery, useMeQuery, UserFilterBy, UserFragment } from 'generated/graphql';
import { GetStaticProps } from 'next';
import { Button, Flex, Heading, Skeleton, useColorModeValue, VStack } from '@chakra-ui/react';
import { Leaderboards } from '@components/leaderboards/leaderboards';
import { __URI__ } from '@utils/constants';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { withApollo } from '@modules/core/apollo/apollo';
import LayoutCore from 'layouts/core/components/layout-core';

interface LeaderboardsPageProps {
  locale: string;
}

const LeaderboardsPage: React.FC<LeaderboardsPageProps> = ({ locale }) => {
  const [me, setMe] = useState<UserFragment>();
  const [page, setPage] = useState(0);
  const [filterBy, setFilterBy] = useState<UserFilterBy>(UserFilterBy.Accuracy);
  const { data: meUserData, loading: meLoading } = useMeQuery({});

  // Me data
  useEffect(() => {
    if (meUserData?.me?.user && !meLoading) {
      setMe(meUserData.me.user);
    }
  }, [meUserData]);

  const {
    data: filteredUsers,
    loading: dataLoading,
    fetchMore,
    refetch: refetchFilteredUsers,
  } = useFilterUsersQuery({
    variables: {
      page: page,
      filterBy,
    },
  });

  const switchFilterBy = (filterBy: UserFilterBy) => {
    setFilterBy(filterBy);
    refetchFilteredUsers();
  };

  return (
    <LayoutCore
      user={me}
      headProps={{
        seoTitle: 'Leaderboards | Mecha Type',
        seoDescription: 'Leaderboards of Mecha Type, see who is the best at typing!',
        seoUrl: `${__URI__}/leaderboards`,
      }}
    >
      <VStack>
        {/* Heading */}
        <Flex
          flexDir="column"
          rounded="lg"
          alignContent="center"
          alignItems="center"
          backgroundColor={useColorModeValue('gray.300', 'gray.900')}
          borderRadius="15px"
          width="100%"
          m={4}
          p={4}
        >
          <Heading as="h1" fontSize="4xl" fontWeight={700}>
            Leaderboards
          </Heading>
        </Flex>
        {/* Controls */}
        <Flex flexDir={['column', 'column', 'row', 'row']} justifyContent="center" marginLeft="auto" width="100%">
          <Button
            variant="outline"
            my={[2, 2, 0, 0]}
            mx={2}
            onClick={() => {
              switchFilterBy(UserFilterBy.Accuracy);
            }}
          >
            Accuracy
          </Button>
          <Button
            variant="outline"
            my={[2, 2, 0, 0]}
            mx={2}
            onClick={() => {
              switchFilterBy(UserFilterBy.Wpm);
            }}
          >
            Words Per Minute
          </Button>
          <Button
            variant="outline"
            my={[2, 2, 0, 0]}
            mx={2}
            onClick={() => {
              switchFilterBy(UserFilterBy.Cpm);
            }}
          >
            Chars Per Minute
          </Button>
          <Button
            variant="outline"
            my={[2, 2, 0, 0]}
            mx={2}
            onClick={() => {
              switchFilterBy(UserFilterBy.Keystrokes);
            }}
          >
            Keystrokes
          </Button>
          <Button
            variant="outline"
            my={[2, 2, 0, 0]}
            mx={2}
            onClick={() => {
              switchFilterBy(UserFilterBy.Testscompleted);
            }}
          >
            Tests Completed
          </Button>
        </Flex>
        {/* Table */}
        <Skeleton isLoaded={!dataLoading} width="100%">
          <Leaderboards usersData={filteredUsers?.filterUsers?.nodes!} filterBy={filterBy} />
        </Skeleton>
        {/* {filteredUsers?.filterUsers && filteredUsers.filterUsers.hasMore && (
            <Button
              variant="solid"
              onClick={() => {
                setPage(page + 1);
                fetchMore({
                  variables: {
                    page: page + 1,
                  },
                });
              }}
            >
              Load More
            </Button>
          )} */}
      </VStack>
    </LayoutCore>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { locale } = context;
  return { props: { locale, ...(await serverSideTranslations(locale ?? 'en', ['sidebar'])) } };
};

export default withApollo({})(LeaderboardsPage);

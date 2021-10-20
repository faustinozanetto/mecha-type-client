import React, { useEffect, useState } from 'react';
import { Flex, Heading, VStack, useColorModeValue, Button, Skeleton } from '@chakra-ui/react';
import { FilteredUserFragment, useFilterUsersQuery, UserFilterBy } from '@generated/graphql';
import { generateMappedFilteredUsers } from '@modules/core/user/user';
import { LeaderboardCategories } from './leaderboard-categories';
import { LeaderboardTable } from './leaderboard-table';
import { useLeaderboardState } from 'state';

interface LeaderboardsProps {}

export const LeaderboardsDashboard: React.FC<LeaderboardsProps> = ({}) => {
  const [pageCount, setPageCount] = useState(0);
  const [filteredUsers, setFilteredUsers] = useState<FilteredUserFragment[]>([]);
  const leaderboardFilterBy = useLeaderboardState((state) => state.leaderboardFilterBy);

  const [filterBy, setFilterBy] = useState<UserFilterBy>(UserFilterBy.Accuracy);
  const {
    data: filteredUsersData,
    loading: filteredUsersLoading,
    fetchMore,
    variables,
  } = useFilterUsersQuery({
    variables: {
      input: {
        take: 5,
        skip: 0,
        filterBy: filterBy,
        where: {},
      },
    },
    notifyOnNetworkStatusChange: true,
  });
  // Fetch more on page update
  useEffect(() => {
    if (pageCount > 0) {
      fetchMore({
        variables: {
          input: {
            take: variables.input.take,
            skip: 5 * pageCount,
            filterBy: filterBy,
            where: {},
          },
        },
      });
    }
  }, [pageCount]);

  // Updating filter by
  useEffect(() => {
    setFilterBy(leaderboardFilterBy);
  }, [leaderboardFilterBy]);

  // Filtered Users
  useEffect(() => {
    if (filteredUsersData?.filterUsers?.edges?.length > 0 && !filteredUsersLoading) {
      const mappedUsers = filteredUsersData.filterUsers.edges.map((edge) => edge.node);
      setFilteredUsers(generateMappedFilteredUsers(mappedUsers, filterBy));
    }
  }, [filteredUsersData, filterBy, pageCount, filteredUsersLoading]);
  return (
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
      {/* Categories */}
      <LeaderboardCategories />

      {/* Table */}
      <Skeleton isLoaded={!filteredUsersLoading} width="100%">
        <LeaderboardTable filteredUsers={filteredUsers} filterBy={filterBy} />
      </Skeleton>
      {filteredUsers && filteredUsersData?.filterUsers?.pageInfo?.hasMore && (
        <Button
          my={4}
          colorScheme="twitter"
          rounded="xl"
          size="lg"
          onClick={() => {
            // Fetch more and increase current page by one.
            setPageCount(pageCount + 1);
          }}
        >
          Load More
        </Button>
      )}
    </VStack>
  );
};

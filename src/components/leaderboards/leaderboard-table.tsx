import React from 'react';
import { Flex, Table, Tbody, Td, Tfoot, Th, Thead, Tr, useColorModeValue } from '@chakra-ui/react';
import { LeaderboardUser } from './leaderboard-user';
import { FilteredUserFragment, UserFilterBy } from '@generated/graphql';

interface LeaderboardTableProps {
  filteredUsers: FilteredUserFragment[];
  filterBy: UserFilterBy;
}

export const LeaderboardTable: React.FC<LeaderboardTableProps> = ({ filteredUsers, filterBy }) => {
  return (
    <Flex
      width="100%"
      p={3}
      borderWidth="1px"
      rounded="md"
      transitionProperty="all"
      transitionDuration="200ms"
      backgroundColor={useColorModeValue('gray.300', 'gray.900')}
    >
      <Table variant="striped" size="md">
        <Thead>
          <Tr>
            <Th>User</Th>
            <Th>{filterBy}</Th>
            <Th>Position</Th>
          </Tr>
        </Thead>
        <Tbody>
          {filteredUsers &&
            filteredUsers.map((user, index) => {
              return (
                <Tr key={user.username + index}>
                  <Td>
                    <LeaderboardUser user={user} />
                  </Td>
                  <Td>{user.value}</Td>
                  <Td># {index + 1}</Td>
                </Tr>
              );
            })}
        </Tbody>
        <Tfoot>
          <Tr>
            <Th>User</Th>
            <Th>{filterBy}</Th>
            <Th>Position</Th>
          </Tr>
        </Tfoot>
      </Table>
    </Flex>
  );
};

import React from 'react';
import {
  Flex,
  Heading,
  VStack,
  useColorModeValue,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Tfoot,
  Button,
} from '@chakra-ui/react';
import { FilteredUserFragment, UserFilterBy } from '@generated/graphql';
import { LeaderboardUser } from './leaderboard-user';

interface LeaderboardsProps {
  /** Users data */
  usersData: FilteredUserFragment[];
  /** Filter by type */
  filterBy: UserFilterBy;
}

export const Leaderboards: React.FC<LeaderboardsProps> = ({ usersData, filterBy }) => {
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
          {usersData &&
            usersData.map((user, index) => {
              return (
                <Tr key={user.name + index}>
                  <Td>
                    <LeaderboardUser user={user} />
                  </Td>
                  <Td>{user.value}</Td>
                  <Td># {usersData.indexOf(user) + 1}</Td>
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

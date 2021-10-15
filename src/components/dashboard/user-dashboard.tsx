import React from 'react';
import { UserFragment } from 'generated/graphql';
import { Flex, Text, Heading } from '@chakra-ui/react';

interface DashboardProps {
  /**
   * UserFragment to retrieve data from.
   */
  user: UserFragment;
}

export const UserDashboard: React.FC<DashboardProps> = ({ user }) => {
  return (
    <Flex flexDir="column" width="full" py={8}>
      {/* Heading */}
      <Flex flexDir="column">
        <Heading as="h1">Welcome back, {user.username}.</Heading>
        <Text as="h2" ml={2} fontSize="lg" fontWeight={500}>
          You have improved a lot since last week!
        </Text>
      </Flex>
    </Flex>
  );
};

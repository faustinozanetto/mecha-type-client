import React from 'react';
import { HStack, Text } from '@chakra-ui/react';
import { FilteredUserFragment } from '@generated/graphql';
import { UserAvatar } from '@components/user/profile/page/user/user-avatar';

interface LeaderboardUserProps {
  user: FilteredUserFragment;
}

export const LeaderboardUser: React.FC<LeaderboardUserProps> = ({ user }) => {
  return (
    <HStack as="a" cursor="pointer" href={`/user/${user.name}`}>
      <UserAvatar imageUrl={user.image} size={35} loading={false} />
      <Text as="h3" fontWeight={600}>
        {user.name}
      </Text>
    </HStack>
  );
};

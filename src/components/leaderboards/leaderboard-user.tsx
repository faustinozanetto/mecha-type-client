import React from 'react';
import { HStack, Text } from '@chakra-ui/react';
import { FilteredUserFragment } from '@generated/graphql';
import { UserAvatar } from '@components/user/profile/page/user/user-avatar';
import { generateAvatarURl } from '@modules/core/user/user';

interface LeaderboardUserProps {
  user: FilteredUserFragment;
}

export const LeaderboardUser: React.FC<LeaderboardUserProps> = ({ user }) => {
  return (
    <HStack as="a" cursor="pointer" href={`/user/${user.username}`}>
      <UserAvatar imageUrl={generateAvatarURl(user)} size={35} loading={false} />
      <Text as="h3" fontWeight={600}>
        {user.username}
      </Text>
    </HStack>
  );
};

import React from 'react';
import { useRouter } from 'next/router';
import { Flex, Skeleton, Text } from '@chakra-ui/react';
import { User } from '@generated/graphql';
import { UserAvatar } from '../../user/user-avatar';

interface UserFollowerCardProps {
  /** Follower Data */
  follower: User;
  /** Wether content is loading or not */
  loading: boolean;
}

export const UserFollowerCard: React.FC<UserFollowerCardProps> = ({ follower, loading }) => {
  const router = useRouter();

  return (
    <Flex
      as="a"
      flexDir="row"
      backgroundColor="#1a202c"
      alignContent="flex-start"
      justifyContent="flex-start"
      alignItems="center"
      margin={2}
      padding={4}
      borderRadius="lg"
      width={['auto', 'auto', 'auto', '100%', '100%']}
      cursor="pointer"
      href={`/user/${follower.name}`}
    >
      <UserAvatar imageUrl={follower?.image!} size={50} loading={loading} />
      <Skeleton isLoaded={!loading} height="auto" ml={4}>
        <Text fontSize="lg" fontWeight="semibold" color="white">
          {follower?.name}
        </Text>
      </Skeleton>
    </Flex>
  );
};

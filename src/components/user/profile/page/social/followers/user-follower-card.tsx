import React from 'react';
import { useRouter } from 'next/router';
import { Flex, Skeleton, Text, useColorModeValue } from '@chakra-ui/react';
import { UserFollowerFragment } from '@generated/graphql';
import { UserAvatar } from '../../user/user-avatar';
import { generateAvatarURl } from '@lib/user/userHelper';

interface UserFollowerCardProps {
  /** Follower Data */
  follower: UserFollowerFragment;
  /** Wether content is loading or not */
  loading: boolean;
}

export const UserFollowerCard: React.FC<UserFollowerCardProps> = ({ follower, loading }) => {
  const router = useRouter();

  return (
    <Flex
      as="a"
      flexDir="row"
      backgroundColor={useColorModeValue('gray.400', 'gray.800')}
      alignContent="flex-start"
      justifyContent="flex-start"
      alignItems="center"
      margin={2}
      padding={4}
      borderRadius="lg"
      width={['auto', 'auto', 'auto', '100%', '100%']}
      cursor="pointer"
      href={`/user/${follower.username}`}
    >
      <UserAvatar imageUrl={generateAvatarURl(follower)} size={50} loading={loading} />
      <Skeleton isLoaded={!loading} height="auto" ml={4}>
        <Text fontSize="lg" fontWeight="semibold" color={useColorModeValue('black', 'white')}>
          {follower?.username}
        </Text>
      </Skeleton>
    </Flex>
  );
};

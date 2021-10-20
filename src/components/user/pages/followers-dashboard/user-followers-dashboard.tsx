import React, { useEffect, useState } from 'react';
import { Flex, Grid, Text, useColorModeValue, VStack } from '@chakra-ui/react';
import { UserAvatar } from '@components/user/profile/page/user/user-avatar';
import {
  FollowStatus,
  useAcceptFollowRequestMutation,
  useDenyFollowRequestMutation,
  UserFollowerFragment,
  UserFragment,
  useUserFollowersQuery,
} from '@generated/graphql';
import { generateAvatarURl } from '@modules/core/user/user';
import { UserFollowerDashboardCard } from './user-follower-dashboard-card';

interface UserFollowersDashboardProps {
  user: UserFragment;
}

const UserFollowersDashboard: React.FC<UserFollowersDashboardProps> = ({ user }) => {
  const [followers, setFollowers] = useState<UserFollowerFragment[]>([]);
  const [pendingRequests, setPendingRequests] = useState<UserFollowerFragment[]>([]);
  const [acceptFollowRequest] = useAcceptFollowRequestMutation();
  const [denyFollowRequest] = useDenyFollowRequestMutation();
  const {
    data: followersData,
    loading: followersLoading,
    refetch: userFollowersRefetch,
  } = useUserFollowersQuery({
    variables: {
      input: {
        take: 4,
        skip: 0,
        where: {
          id: user?.id,
        },
      },
    },
  });

  // Followers
  useEffect(() => {
    if (followersData?.userFollowers?.edges?.length > 0 && !followersLoading) {
      const mappedFollowers = followersData.userFollowers.edges.map((edge) => edge.node);
      setFollowers(mappedFollowers);
      // Pending requests
      setPendingRequests(mappedFollowers.filter((follower) => follower.status === FollowStatus.Pending));
    }
  }, [followersData, followersLoading]);

  return (
    <Grid templateRows="repeat(1, 1fr)" templateColumns="auto 1fr" gap={4}>
      {/* Left Content */}
      <Flex
        flexDir="column"
        padding="1rem"
        borderRadius="2xl"
        boxShadow="xl"
        backgroundColor={useColorModeValue('gray.300', 'gray.700')}
      >
        <Flex flexDir="column" justifyContent="space-between">
          {user && <UserAvatar imageUrl={generateAvatarURl(user)} size={175} loading={false} />}
          <Text as="h1" fontSize="3xl" color={useColorModeValue('black', 'white')} fontWeight={700}>
            {user?.username}
          </Text>
          <Text as="h2" fontSize="lg" color={useColorModeValue('black', 'white')} fontWeight={500}>
            {pendingRequests.length} pending requests
          </Text>
        </Flex>
      </Flex>
      {/* Right Content */}
      <Flex
        flexDir="column"
        padding="1rem"
        borderRadius="2xl"
        boxShadow="xl"
        backgroundColor={useColorModeValue('gray.300', 'gray.700')}
      >
        <Text as="h1" fontSize="2xl" color={useColorModeValue('black', 'white')} fontWeight={700} mb={2}>
          Follow Requests
        </Text>
        {pendingRequests && pendingRequests.length > 0 && (
          <VStack spacing="0.5rem" width="100%">
            {pendingRequests.map((follower) => {
              return (
                <UserFollowerDashboardCard
                  key={follower.id}
                  follower={follower}
                  loading={false}
                  onRequestAccepted={() => {
                    acceptFollowRequest({
                      variables: {
                        userId: user.id,
                        followerId: follower.id,
                      },
                    });
                    userFollowersRefetch();
                  }}
                  onRequestDenied={() => {
                    denyFollowRequest({
                      variables: {
                        userId: user.id,
                        followerId: follower.id,
                      },
                    });
                    userFollowersRefetch();
                  }}
                />
              );
            })}
          </VStack>
        )}
      </Flex>
    </Grid>
  );
};

export default UserFollowersDashboard;

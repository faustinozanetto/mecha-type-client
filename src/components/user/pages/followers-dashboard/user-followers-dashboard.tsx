import React, { useEffect, useState } from 'react';
import { Button, Flex, Grid, GridItem, HStack, Text, useColorModeValue, VStack } from '@chakra-ui/react';
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
import { motion } from 'framer-motion';

interface UserFollowersDashboardProps {
  user: UserFragment;
}

const UserFollowersDashboard: React.FC<UserFollowersDashboardProps> = ({ user }) => {
  const [pageCount, setPageCount] = useState(0);
  const [followersType, setFollowersType] = useState<FollowStatus>(FollowStatus.Pending);
  const [followers, setFollowers] = useState<UserFollowerFragment[]>([]);
  const [pendingRequests, setPendingRequests] = useState<UserFollowerFragment[]>([]);
  const [acceptedRequests, setAcceptedRequests] = useState<UserFollowerFragment[]>([]);
  const [followersAmount, setFollowersAmount] = useState({ accepted: 0, pending: 0 });
  const [acceptFollowRequest] = useAcceptFollowRequestMutation();
  const [denyFollowRequest] = useDenyFollowRequestMutation();
  const {
    data: followersData,
    loading: followersLoading,
    refetch: userFollowersRefetch,
    fetchMore,
    variables,
  } = useUserFollowersQuery({
    variables: {
      input: {
        take: 5,
        skip: 0,
        where: {
          id: user?.id,
        },
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
            where: {
              id: user?.id,
            },
          },
        },
      });
    }
  }, [pageCount]);

  // Followers
  useEffect(() => {
    if (followersData?.userFollowers?.edges?.length > 0 && !followersLoading) {
      const mappedFollowers = followersData.userFollowers.edges.map((edge) => edge.node);
      setFollowers(mappedFollowers);
      // Pending requests
      setPendingRequests(mappedFollowers.filter((follower) => follower.status === FollowStatus.Pending));
      // Accepted requests
      setAcceptedRequests(mappedFollowers.filter((follower) => follower.status === FollowStatus.Accepted));
      setFollowersAmount({
        accepted: followersData?.userFollowers?.acceptedRequests,
        pending: followersData?.userFollowers?.pendingRequests,
      });
    }
  }, [followersData, pageCount, followersLoading, followersType]);

  return (
    <Grid templateRows="1fr auto" templateColumns="auto 1fr" gap={4}>
      {/* Left Content */}
      <GridItem>
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
            <Text as="h2" fontSize={18} color={useColorModeValue('black', 'white')} fontWeight={600}>
              {followersAmount.pending} pending requests
            </Text>
            <Text as="h2" fontSize={18} color={useColorModeValue('black', 'white')} fontWeight={600}>
              {followersAmount.accepted} followers
            </Text>
          </Flex>
        </Flex>
      </GridItem>
      {/* Right Content */}
      <GridItem>
        <Flex
          flexDir="column"
          padding="1rem"
          borderRadius="2xl"
          boxShadow="xl"
          backgroundColor={useColorModeValue('gray.300', 'gray.700')}
        >
          <HStack justify="center" mb={4}>
            <Text as="h1" fontSize="2xl" color={useColorModeValue('black', 'white')} fontWeight={700}>
              {followersType === FollowStatus.Pending
                ? 'Pending Requests'
                : followersType === FollowStatus.Accepted
                ? 'Accepted Requests'
                : 'Requests'}
            </Text>
            <HStack>
              <Button variant="ghost" onClick={() => setFollowersType(FollowStatus.Pending)}>
                Pending
              </Button>
              <Button variant="ghost" onClick={() => setFollowersType(FollowStatus.Accepted)}>
                Accepted
              </Button>
              <Button as="a" href={`/user/${user.username}`} variant="ghost">
                Back
              </Button>
            </HStack>
          </HStack>
          {followersType === FollowStatus.Pending && pendingRequests.length > 0 && (
            <VStack spacing="0.5rem" width="100%">
              {pendingRequests.map((follower, index) => {
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, translateY: -25 }}
                    animate={{ opacity: 1, translateY: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.15 }}
                    style={{ width: '100%' }}
                  >
                    <UserFollowerDashboardCard
                      key={follower.id}
                      follower={follower}
                      loading={false}
                      canAccept={true}
                      canDeny={true}
                      onRequestAccepted={async () => {
                        await acceptFollowRequest({
                          variables: {
                            userId: user.id,
                            followerId: follower.id,
                          },
                        });
                        setPageCount(0);
                        userFollowersRefetch();
                      }}
                      onRequestDenied={async () => {
                        await denyFollowRequest({
                          variables: {
                            userId: user.id,
                            followerId: follower.id,
                          },
                        });
                        setPageCount(0);
                        userFollowersRefetch();
                      }}
                    />
                  </motion.div>
                );
              })}
            </VStack>
          )}
          {followersType === FollowStatus.Accepted && acceptedRequests && acceptedRequests.length > 0 && (
            <VStack spacing="0.5rem" width="100%">
              {acceptedRequests.map((follower, index) => {
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, translateY: -25 }}
                    animate={{ opacity: 1, translateY: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.15 }}
                    style={{ width: '100%' }}
                  >
                    <UserFollowerDashboardCard
                      key={follower.id}
                      follower={follower}
                      loading={false}
                      canAccept={false}
                      canDeny={true}
                      onRequestDenied={async () => {
                        await denyFollowRequest({
                          variables: {
                            userId: user.id,
                            followerId: follower.id,
                          },
                        });
                        userFollowersRefetch();
                      }}
                    />
                  </motion.div>
                );
              })}
            </VStack>
          )}
          {followers && followersData?.userFollowers?.pageInfo?.hasMore && (
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
        </Flex>
      </GridItem>
    </Grid>
  );
};

export default UserFollowersDashboard;

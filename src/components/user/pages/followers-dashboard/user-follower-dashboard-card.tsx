import React from 'react';
import { IconButton, Flex, Skeleton, Text, useColorModeValue, HStack, Tooltip, Spacer } from '@chakra-ui/react';
import { UserFollowerFragment } from '@generated/graphql';
import { generateAvatarURl } from '@modules/core/user/user';
import { UserAvatar } from '@components/user/profile/page/user/user-avatar';
import { CheckIcon, CloseIcon } from '@chakra-ui/icons';

interface UserFollowerDashboardCardProps {
  /** Follower Data */
  follower: UserFollowerFragment;
  canDeny: boolean;
  canAccept: boolean;
  /** Wether content is loading or not */
  loading: boolean;
  onRequestAccepted?: () => void;
  onRequestDenied?: () => void;
}

export const UserFollowerDashboardCard: React.FC<UserFollowerDashboardCardProps> = ({
  follower,
  canDeny,
  canAccept,
  loading,
  onRequestAccepted,
  onRequestDenied,
}) => {
  return (
    <Flex
      flexDir="row"
      backgroundColor={useColorModeValue('gray.400', 'gray.800')}
      alignContent="flex-start"
      justifyContent="flex-start"
      alignItems="center"
      padding={4}
      borderRadius="lg"
    >
      <UserAvatar imageUrl={generateAvatarURl(follower)} size={50} loading={loading} />
      <Skeleton isLoaded={!loading} height="auto" mx={4}>
        <Text fontSize="xl" fontWeight="semibold" color={useColorModeValue('black', 'white')}>
          {follower?.username}
        </Text>
      </Skeleton>
      <Spacer />
      <HStack ml={4}>
        {/* Deny */}
        {canDeny && (
          <Tooltip label="Remove" fontSize="md">
            <IconButton colorScheme="red" aria-label="Remove Request" icon={<CloseIcon />} onClick={onRequestDenied} />
          </Tooltip>
        )}

        {/* Accept */}
        {canAccept && (
          <Tooltip label="Accept" fontSize="md">
            <IconButton
              colorScheme="green"
              aria-label="Accept Request"
              icon={<CheckIcon />}
              onClick={onRequestAccepted}
            />
          </Tooltip>
        )}
      </HStack>
    </Flex>
  );
};

import React from 'react';
import { Badge, Flex, Text, HStack, Skeleton, SkeletonText, useColorModeValue } from '@chakra-ui/react';
import { UserFragment, UserBadge } from '@generated/graphql';
import { useTranslation } from 'next-i18next';
import dynamic from 'next/dynamic';
import { UserAvatar } from '../user-avatar';
import { Session } from 'next-auth';
import { SettingsButton } from './settings-button';

const FollowButton = dynamic(() => import('@components/user/profile/page/user/details/follow-button'));

interface UserProfileDetailsProps {
  /** Current logged in user */
  user: UserFragment;
  /** Target user to show profile */
  targetUser: UserFragment;
  /** Wether content is loading or not */
  loading: boolean;
  /** Session object */
  session: Session;
  /** If the current logged in user is the same as the profile page */
  ownsPage: boolean;
  /** Wether the user already follows or not the target user. */
  followsUser: boolean;
  /** Used to re fetch the user follows query */
  followsUserRefetch: any;
  /** Used to re fetch the followers list query */
  followersRefetch: any;
  settingsButtonClick: () => void;
}

const UserProfileDetails: React.FC<UserProfileDetailsProps> = ({
  user,
  targetUser,
  loading,
  session,
  ownsPage,
  followsUser,
  followsUserRefetch,
  followersRefetch,
  settingsButtonClick,
}) => {
  const { t } = useTranslation('user-profile');
  return (
    <Flex
      flexDir="column"
      padding="1rem"
      borderRadius="2xl"
      boxShadow="xl"
      backgroundColor={useColorModeValue('gray.300', 'gray.700')}
    >
      <Flex flexDir={['column', 'column', 'column', 'row', 'row']} justifyContent="space-between">
        <UserAvatar imageUrl={targetUser?.image!} size={150} loading={loading} />
        <Flex
          flexDir="column"
          flex="1"
          marginLeft={[0, 0, 0, 4, 4]}
          marginRight={[0, 0, 0, 4, 4]}
          marginBottom={[4, 4, 4, 0, 0]}
        >
          <HStack alignContent="center" alignItems="center">
            <Skeleton isLoaded={!loading} height={loading ? '20px' : 'auto'}>
              <Text as="h1" fontSize="3xl" color={useColorModeValue('black', 'white')} fontWeight={700}>
                {targetUser?.name}
              </Text>
            </Skeleton>
            {targetUser?.badge !== UserBadge.Default && (
              <Badge colorScheme={targetUser?.badge === UserBadge.Pro ? 'yellow' : 'red'}>
                {targetUser?.badge?.toUpperCase()}
              </Badge>
            )}
          </HStack>
          <SkeletonText isLoaded={!loading} noOfLines={1} py={!loading ? 0 : 2}>
            <Text as="p" fontSize="xl" color={useColorModeValue('black', 'white')} fontWeight={500}>
              {targetUser?.country ? targetUser?.country : t('no-user-country')}
            </Text>
          </SkeletonText>
          <SkeletonText isLoaded={!loading} noOfLines={2} py={!loading ? 0 : 2}>
            <Text as="p" fontSize="lg" color={useColorModeValue('black', 'white')} fontWeight={400}>
              {targetUser?.description ? targetUser?.description : t('no-user-description')}
            </Text>
          </SkeletonText>
        </Flex>
        {/* Buttons */}
        <Flex flexDir="column" alignItems="center">
          <FollowButton
            loading={loading}
            user={user}
            targetUser={targetUser}
            followsUser={followsUser}
            sameUser={ownsPage}
            session={session}
            followsUserRefetch={followsUserRefetch}
            followersRefetch={followersRefetch}
          />
          {ownsPage && <SettingsButton loading={loading} onClick={settingsButtonClick} />}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default UserProfileDetails;

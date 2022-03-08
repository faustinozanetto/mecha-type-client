import React from 'react';
import { Badge, Flex, Text, HStack, Skeleton, SkeletonText, useColorModeValue } from '@chakra-ui/react';
import { UserFragment, UserBadge } from '@generated/graphql';
import { useTranslation } from 'next-i18next';
import { UserAvatar } from '../user-avatar';
import { SettingsButton } from './settings-button';
import { generateAvatarURl } from '@modules/core/user/user';
import { UserProfileCountry } from './user-profile-country';
import FollowButton from './follow-button';
import { CountryEntry } from '@typings/user.types';
import ManageFollowersButton from './manage-followers-button';

interface UserProfileDetailsProps {
  /** Current logged in user */
  user: UserFragment;
  /** Target user to show profile */
  targetUser: UserFragment;
  /** Wether content is loading or not */
  loading: boolean;
  /** If the current logged in user is the same as the profile page */
  refetchUserFollowers: any;
  /** Wether the current logged in user owns the user page or not */
  ownsPage: boolean;
  /** Country data */
  country: CountryEntry;
}

const UserProfileDetails: React.FC<UserProfileDetailsProps> = ({
  user,
  targetUser,
  loading,
  ownsPage,
  refetchUserFollowers,
  country,
}) => {
  const { t } = useTranslation('user-profile');
  return (
    <Flex
      flexDir="column"
      padding="1rem"
      borderRadius="2xl"
      boxShadow="xl"
      bg={useColorModeValue('gray.100', 'gray.700')}
      color={useColorModeValue('gray.700', 'gray.200')}
    >
      <Flex flexDir={['column', 'column', 'column', 'row', 'row']} justifyContent="space-between">
        {targetUser && <UserAvatar imageUrl={generateAvatarURl(targetUser)} size={150} loading={loading} />}
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
                {targetUser?.username}
              </Text>
            </Skeleton>
            {targetUser?.badge !== UserBadge.Default && (
              <Badge colorScheme={targetUser?.badge === UserBadge.Pro ? 'yellow' : 'red'}>
                {targetUser?.badge?.toUpperCase()}
              </Badge>
            )}
          </HStack>
          <UserProfileCountry countryData={country} loading={loading} />
          <SkeletonText isLoaded={!loading} noOfLines={2} py={!loading ? 0 : 2}>
            <Text as="p" fontSize="lg" color={useColorModeValue('black', 'white')} fontWeight={500}>
              {targetUser?.description ? targetUser?.description : t('no-user-description')}
            </Text>
          </SkeletonText>
        </Flex>
        {/* Buttons */}
        <Flex flexDir="column" alignItems="center">
          {ownsPage && <ManageFollowersButton loading={loading} />}
          {!ownsPage && (
            <FollowButton
              loading={loading}
              user={user}
              targetUser={targetUser}
              sameUser={ownsPage}
              refetchUserFollowers={refetchUserFollowers}
            />
          )}
          {ownsPage && <SettingsButton loading={loading} />}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default UserProfileDetails;

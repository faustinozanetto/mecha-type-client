import React, { useState } from 'react';
import { User, UserBadge, useUserFollowersQuery } from 'generated/graphql';
import { FollowButton, SettingsButton } from '.';
import { useTranslation } from 'next-i18next';
import { UserAvatar } from './user-avatar';
import { Session } from 'next-auth';
import { UserProfileStats } from '../../../stats/user-profile-stats';
import { UserProfileSocial } from '../social/user-profile-social';
import { UserProfilePresets } from '../presets/use-profile-presets';
import {
  Text,
  SkeletonText,
  Skeleton,
  Badge,
  HStack,
  Container,
  Flex,
  useColorModeValue,
  Grid,
  GridItem,
} from '@chakra-ui/react';
import { EditUserProfile } from '../../edit';
import { CountryEntry } from '@pages/user/[id]';

interface IUserProfileProps {
  user: User;
  /** Target user to show profile */
  targetUser: User;
  /** Wether content is loading or not */
  loading: boolean;
  /** If the current logged in user is the same as the profile page */
  ownsPage: boolean;
  /** Session object */
  session: Session;
  /** Countries data */
  countries: CountryEntry[];
}

export const UserProfile: React.FC<IUserProfileProps> = ({
  user,
  targetUser,
  loading,
  ownsPage,
  session,
  countries,
}) => {
  const { t } = useTranslation('user-profile');
  const [editing, setEditing] = useState(false);
  const topBg = useColorModeValue('gray.300', 'gray.700');
  const textColor = useColorModeValue('black', 'white');
  const { data: followersData, refetch: followersRefetch } = useUserFollowersQuery({
    skip: targetUser?.id === undefined,
    variables: {
      userId: targetUser?.id,
    },
  });

  if (editing) {
    return (
      <EditUserProfile
        user={targetUser as User}
        loading={loading}
        countries={countries}
        onUpdatedCallback={() => {
          setEditing(false);
        }}
      />
    );
  }

  return (
    <Container maxW={['1xl', '2xl', '3xl', '5xl', '7xl']}>
      <Flex flexDir="column" padding="1rem" borderRadius="2xl" boxShadow="xl" backgroundColor={topBg}>
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
                <Text as="h1" fontSize="3xl" color={textColor} fontWeight={700}>
                  {targetUser?.name}
                </Text>
              </Skeleton>
              {targetUser?.badge !== UserBadge.Default && (
                <Badge colorScheme={targetUser?.badge === UserBadge.Pro ? 'yellow' : 'red'}>
                  {targetUser?.badge.toUpperCase()}
                </Badge>
              )}
            </HStack>
            <SkeletonText isLoaded={!loading} noOfLines={1} py={!loading ? 0 : 2}>
              <Text as="p" fontSize="xl" color={textColor} fontWeight={500}>
                {targetUser?.country ? targetUser?.country : t('no-user-country')}
              </Text>
            </SkeletonText>
            <SkeletonText isLoaded={!loading} noOfLines={2} py={!loading ? 0 : 2}>
              <Text as="p" fontSize="lg" color={textColor} fontWeight={400}>
                {targetUser?.description ? targetUser?.description : t('no-user-description')}
              </Text>
            </SkeletonText>
          </Flex>
          <Flex flexDir="column" alignItems="center">
            <FollowButton
              user={user}
              targetUser={targetUser}
              sameUser={ownsPage}
              session={session}
              followersRefetch={followersRefetch}
            />
            {ownsPage && (
              <SettingsButton
                user={targetUser}
                onClick={() => {
                  setEditing(true);
                }}
              />
            )}
          </Flex>
        </Flex>
      </Flex>
      <Grid templateColumns="repeat(2,1fr)" templateRows="repeat(3, auto)" gap={4}>
        <GridItem rowSpan={1} colSpan={2}>
          <UserProfileStats user={targetUser} loading={loading} />
        </GridItem>
        <GridItem colSpan={[2, 2, 2, 1, 1]}>
          {/* @ts-ignore */}
          <UserProfileSocial followersData={followersData?.userFollowers.users} loading={loading} />
        </GridItem>
        <GridItem colSpan={[2, 2, 2, 1, 1]}>
          <UserProfilePresets presets={targetUser?.testPresets!} loading={loading} />
        </GridItem>
      </Grid>
    </Container>
  );
};

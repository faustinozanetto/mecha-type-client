import React from 'react';
import { Grid, GridItem } from '@chakra-ui/react';
import { UserFollowerFragment, UserFragment } from '@generated/graphql';
import dynamic from 'next/dynamic';
import { UserParsedStats } from '@modules/core/user/user';

const UserProfileStats = dynamic(() => import('@components/user/profile/page/stats/user-profile-stats'));

const UserProfileSocial = dynamic(() => import('@components/user/profile/page/social/user-profile-social'));

const UserProfilePresets = dynamic(() => import('@components/user/profile/page/presets/use-profile-presets'));

interface UserProfileStatsProps {
  /** Target user to show profile */
  targetUser: UserFragment;
  /** User followers */
  followers: UserFollowerFragment[];
  parsedStats: UserParsedStats;
  /** Wether content is loading or not */
  loading: boolean;
}

const UserProfileInformation: React.FC<UserProfileStatsProps> = ({ targetUser, followers, parsedStats, loading }) => {
  return (
    <Grid templateColumns="repeat(2,1fr)" templateRows="repeat(3, auto)" gap={4}>
      <GridItem rowSpan={1} colSpan={2}>
        <UserProfileStats user={targetUser} loading={loading} parsedStats={parsedStats} />
      </GridItem>
      <GridItem colSpan={[2, 2, 2, 1, 1]}>
        <UserProfileSocial followersData={followers} loading={loading} />
      </GridItem>
      <GridItem colSpan={[2, 2, 2, 1, 1]}>
        <UserProfilePresets presets={targetUser?.testPresets!} loading={loading} />
      </GridItem>
    </Grid>
  );
};

export default UserProfileInformation;

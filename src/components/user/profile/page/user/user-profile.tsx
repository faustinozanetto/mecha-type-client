import React, { useEffect, useMemo, useState } from 'react';
import { FollowStatus, UserFollowerFragment, UserFragment, useUserFollowersQuery } from 'generated/graphql';
import { Container } from '@chakra-ui/react';
import { generateParsedStats, UserParsedStats } from '@modules/core/user/user';
import UserProfileDetails from './details/user-profile-details';
import UserProfileInformation from './details/user-profile-information';
import { CountryEntry } from '@typings/user.types';

interface IUserProfileProps {
  /** Current logged in user */
  user: UserFragment;
  /** Target user to show profile */
  targetUser: UserFragment;
  /** Wether content is loading or not */
  loading: boolean;
  /** If the current logged in user is the same as the profile page */
  ownsPage: boolean;
  /** Countries data */
  countries: CountryEntry[];
}

const UserProfile: React.FC<IUserProfileProps> = ({ user, targetUser, loading, ownsPage, countries }) => {
  const [followers, setFollowers] = useState<UserFollowerFragment[]>([]);
  const [parsedStats, setParsedStats] = useState<UserParsedStats>({
    averageAccuracy: 0,
    averageCPM: 0,
    averageWPM: 0,
    keystrokes: 0,
    testsCompleted: 0,
  });

  const {
    data: followersData,
    loading: followersLoading,
    refetch: refetchUserFollowers,
  } = useUserFollowersQuery({
    variables: {
      input: {
        take: 4,
        skip: 0,
        where: {
          username: targetUser?.username,
        },
      },
    },
  });

  const getUserCountryData = (user: UserFragment): CountryEntry => {
    const country = countries.find((country) => {
      if (country.name) return country?.name === user?.country;
    });
    if (country) {
      return country;
    }
    return {
      name: undefined,
      flag: undefined,
    };
  };

  // Followers
  useEffect(() => {
    if (followersData?.userFollowers?.edges?.length > 0 && !followersLoading) {
      const mappedFollowers = followersData.userFollowers.edges.map((edge) => edge.node);
      const acceptedFollowers = mappedFollowers.filter((follower) => {
        return follower.status === FollowStatus.Accepted;
      });
      setFollowers(acceptedFollowers);
    }
  }, [followersData]);

  useEffect(() => {
    setParsedStats(generateParsedStats(targetUser));
  }, [targetUser?.testPresetHistory, loading]);

  return (
    <Container maxW={['1xl', '2xl', '3xl', '5xl', '7xl']}>
      <UserProfileDetails
        user={user}
        targetUser={targetUser}
        loading={loading}
        ownsPage={ownsPage}
        refetchUserFollowers={refetchUserFollowers}
        country={getUserCountryData(user)}
      />
      {parsedStats && (
        <UserProfileInformation
          loading={loading}
          targetUser={targetUser}
          ownsPage={ownsPage}
          loggedInUsername={user?.username}
          parsedStats={parsedStats}
          followers={followers}
        />
      )}
    </Container>
  );
};

export default UserProfile;

import React, { useEffect, useState } from 'react';
import { useFollowsUserQuery, UserFragment, useUserFollowersQuery } from 'generated/graphql';
import { Container } from '@chakra-ui/react';
import { generateParsedStats, UserParsedStats } from '@modules/core/user/user';
import UserProfileDetails from './details/user-profile-details';
import UserProfileInformation from './details/user-profile-information';
import { CountryEntry } from 'typings/user';

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
  const [parsedStats, setParsedStats] = useState<UserParsedStats>({
    averageAccuracy: 0,
    averageCPM: 0,
    averageWPM: 0,
    keystrokes: 0,
    testsCompleted: 0,
  });

  const { data: followersData, refetch: followersRefetch } = useUserFollowersQuery({
    skip: targetUser?.id === undefined,
    variables: {
      userId: targetUser?.id,
    },
  });

  const { data: followsUserData, refetch: followsUserRefetch } = useFollowsUserQuery({
    skip: user?.id === targetUser?.id,
    variables: {
      userId: targetUser?.id ?? '',
      followerId: user?.id ?? '',
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
        country={getUserCountryData(user)}
        followsUser={followsUserData?.followsUser?.follows}
        followersRefetch={followersRefetch}
        followsUserRefetch={followsUserRefetch}
      />
      {parsedStats && (
        <UserProfileInformation
          loading={loading}
          targetUser={targetUser}
          parsedStats={parsedStats}
          followers={followersData?.userFollowers?.users!}
        />
      )}
    </Container>
  );
};

export default UserProfile;

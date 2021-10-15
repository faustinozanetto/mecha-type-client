import React, { useEffect, useState } from 'react';
import { useFollowsUserQuery, User, UserFragment, useUserFollowersQuery } from 'generated/graphql';
import { Container } from '@chakra-ui/react';
import { EditUserProfile } from '../../edit';
import { CountryEntry } from '@pages/user/[id]';
import { generateParsedStats, UserParsedStats } from '@modules/core/user/user';
import UserProfileDetails from './details/user-profile-details';
import UserProfileInformation from './details/user-profile-information';

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
  const [editing, setEditing] = useState(false);
  const [parsedStats, setParsedStats] = useState<UserParsedStats>();

  const { data: followersData, refetch: followersRefetch } = useUserFollowersQuery({
    skip: targetUser?.id === undefined,
    variables: {
      userId: targetUser?.id,
    },
  });

  const { data: followsUserData, refetch: followsUserRefetch } = useFollowsUserQuery({
    skip: user?.id === targetUser?.id,
    variables: {
      userId: user?.id! ?? '',
      targetUserId: targetUser?.id ?? '',
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

  // If editing, return the edit profile component.
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
      <UserProfileDetails
        user={user}
        targetUser={targetUser}
        loading={loading}
        ownsPage={ownsPage}
        country={getUserCountryData(user)}
        followsUser={followsUserData?.followsUser?.valueOf()!}
        followersRefetch={followersRefetch}
        followsUserRefetch={followsUserRefetch}
        settingsButtonClick={() => setEditing(true)}
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

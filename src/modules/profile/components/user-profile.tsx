import { User } from '@prisma/client';
import React from 'react';
import UserProfileDetails from './details/user-profile-details';
import UserProfileStats from './stats/user-profile.stats';

interface IUserProfileProps {}

const UserProfile: React.FC<IUserProfileProps> = (props) => {
  const {} = props;

  return (
    <section className="flex flex-col space-y-2 sm:space-y-4">
      {/* Top Section with main details */}
      <UserProfileDetails />
      {/* Section showcasing user's stats */}
      <UserProfileStats />
    </section>
  );
};

export default UserProfile;

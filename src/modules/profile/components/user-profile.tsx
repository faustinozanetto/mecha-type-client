import { User } from '@prisma/client';
import React from 'react';
import UserProfileDetails from './details/user-profile-details';

interface IUserProfileProps {
  user: User;
}

const UserProfile: React.FC<IUserProfileProps> = (props) => {
  const { user } = props;

  return (
    <section className="flex flex-col">
      {/* Top Section with main details */}
      <UserProfileDetails user={user} />
    </section>
  );
};

export default UserProfile;

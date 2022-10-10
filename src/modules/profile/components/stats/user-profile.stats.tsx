import { useUserProfileContext } from '@modules/profile/context/user-profile-context';

import React from 'react';

interface IUserProfileStatsProps {}

const UserProfileStats: React.FC<IUserProfileStatsProps> = () => {
  const { state } = useUserProfileContext();
  return (
    <div className="flex flex-col items-center p-4 rounded-lg drop-shadow-2xl text-white bg-background-dark dark:text-black dark:bg-background-light xs:items-start xs:flex-row xs:space-x-4"></div>
  );
};

export default UserProfileStats;

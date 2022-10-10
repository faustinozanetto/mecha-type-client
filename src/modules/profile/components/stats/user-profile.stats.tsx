import { useUserProfileContext } from '@modules/profile/context/user-profile-context';

import React from 'react';

interface IUserProfileStatsProps {}

const UserProfileStats: React.FC<IUserProfileStatsProps> = () => {
  const { state } = useUserProfileContext();
  return (
    <div className="flex flex-col p-4 rounded-lg drop-shadow-2xl text-white bg-background-dark dark:text-black dark:bg-background-light">
      <h2 className="text-3xl font-semibold">Stats</h2>
      {/* Stats Grid */}
      <section className="grid gap-4 grid-cols-1 sm:grid-cols-2">
        
      </section>
    </div>
  );
};

export default UserProfileStats;

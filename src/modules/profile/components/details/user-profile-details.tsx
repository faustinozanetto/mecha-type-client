import React from 'react';
import Image from '@modules/ui/components/image/image';
import Skeleton from '@modules/ui/components/skeleton/skeleton';
import { useUserProfileContext } from '@modules/profile/context/user-profile-context';

interface IUserProfileDetailsProps {}

const UserProfileDetails: React.FC<IUserProfileDetailsProps> = () => {
  const { state } = useUserProfileContext();

  return (
    <div className="flex flex-col items-center p-4 rounded-lg drop-shadow-2xl text-white bg-background-dark dark:text-black dark:bg-background-light xs:items-start xs:flex-row xs:space-x-4">
      {/* User Image */}
      <Image
        src={state.user?.image!}
        isImageLoading={state.userLoading}
        className="w-50 rounded-2xl"
        layout="fixed"
        width={150}
        height={150}
      />

      {/*  User Content */}
      <div className="flex flex-col text-center items-center space-y-2 xs:items-start">
        {/* Name */}
        <Skeleton isLoaded={!state.userLoading}>
          <h2 className="font-bold text-3xl">{state.user?.name}</h2>
        </Skeleton>
        {/* Description */}
        <Skeleton isLoaded={!state.userLoading}>
          <p className="text-xl">{state.user?.description}</p>
        </Skeleton>
      </div>
    </div>
  );
};

export default UserProfileDetails;

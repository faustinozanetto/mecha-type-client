import { useUserProfileContext } from '@modules/profile/context/user-profile-context';
import Image from '@modules/ui/components/image/image';
import Skeleton from '@modules/ui/components/skeleton/skeleton';
import React from 'react';

interface IUserProfileDetailsProps {}

const UserProfileDetails: React.FC<IUserProfileDetailsProps> = () => {
  const { state } = useUserProfileContext();

  return (
    <div className="flex flex-col items-center rounded-lg bg-accent p-4 text-white drop-shadow-2xl xs:flex-row xs:items-start xs:space-x-4">
      {/* User Image */}
      <Image
        src={state.user?.image!}
        alt={`${state.user.name} Image`}
        isImageLoading={state.userLoading}
        className="rounded-2xl"
        layout="fixed"
        width={150}
        height={150}
      />

      {/*  User Content */}
      <div className="flex flex-col items-center space-y-2 text-center xs:items-start">
        {/* Name */}
        <Skeleton isLoaded={!state.userLoading}>
          <h2 className="text-3xl font-bold">{state.user?.name}</h2>
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

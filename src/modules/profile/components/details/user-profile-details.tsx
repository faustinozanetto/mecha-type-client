import { useUserProfileContext } from '@modules/profile/context/user-profile-context';
import Image from '@modules/ui/components/image/image';
import Skeleton from '@modules/ui/components/skeleton/skeleton';
import clsx from 'clsx';
import React from 'react';

interface IUserProfileDetailsProps {}

const UserProfileDetails: React.FC<IUserProfileDetailsProps> = () => {
  const { state } = useUserProfileContext();

  return (
    <div className="flex flex-col items-center rounded-lg bg-accent p-4 text-white drop-shadow-2xl xs:flex-row xs:items-start xs:space-x-4">
      {/* User Image */}
      <Skeleton className="rounded-md" isLoaded={!state.userLoading}>
        {state?.user.image && (
          <Image
            src={state.user.image}
            alt={`${state?.user?.name!} Image`}
            className="rounded-2xl"
            layout="fixed"
            width={150}
            height={150}
          />
        )}
      </Skeleton>

      {/*  User Content */}
      <div className={clsx('flex flex-col items-center text-center xs:items-start', state.userLoading && 'space-y-2')}>
        {/* Name */}
        <Skeleton className="rounded-md" isLoaded={!state.userLoading}>
          <h2 className="text-3xl font-bold">{state.user?.name}</h2>
        </Skeleton>
        {/* Description */}
        <Skeleton className="rounded-md" isLoaded={!state.userLoading}>
          <p className="text-xl">{state.user?.description}</p>
        </Skeleton>
      </div>
    </div>
  );
};

export default UserProfileDetails;

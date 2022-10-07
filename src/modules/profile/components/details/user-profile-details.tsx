import { User } from '@prisma/client';
import React from 'react';
import Image from 'next/image';

interface IUserProfileDetailsProps {
  user: User;
}

const UserProfileDetails: React.FC<IUserProfileDetailsProps> = (props) => {
  const { user } = props;

  if (!user.id) return <>Loading</>;

  return (
    <div className="flex flex-col items-center p-4 rounded-lg drop-shadow-2xl bg-primary-400 xs:items-start xs:flex-row xs:space-x-4">
      {/* User Image */}
      <Image src={user.image!} className="rounded-lg" width={150} height={150} layout="fixed" />

      {/*  User Content */}
      <div className="flex flex-col text-center items-center xs:items-start">
        {/* Name */}
        <h2 className="text-white font-bold text-3xl">{user.name}</h2>
        {/* Description */}
        <p className="text-white text-xl">{user.description}</p>
      </div>
    </div>
  );
};

export default UserProfileDetails;

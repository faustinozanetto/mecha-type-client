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
    <div className="flex flex-col p-4 rounded-lg bg-primary-500 text-row justify-between">
      {/* User Image */}
      <Image src={user.image!} className="rounded-lg" width={150} height={150} layout="fixed" />

      {/*  User Content */}
    </div>
  );
};

export default UserProfileDetails;

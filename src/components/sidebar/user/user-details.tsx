import React from 'react';
import FiUser from '@meronex/icons/fi/FiUser';
import { SidebarButton } from '../sidebar-button';
import { UserFragment } from 'generated/graphql';
import Link from 'next/link';

interface UserDetailsProps {
  user: UserFragment;
}

export const UserDetails: React.FC<UserDetailsProps> = ({ user }) => {
  return (
    <Link href={`/user/${user?.username}`} passHref>
      <SidebarButton icon={FiUser} label={`Hi, ${user?.username}`} />
    </Link>
  );
};

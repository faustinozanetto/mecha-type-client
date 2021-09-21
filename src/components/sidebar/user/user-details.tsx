import React from 'react';
import FiUser from '@meronex/icons/fi/FiUser';
import { SidebarButton } from '../sidebar-button';
import { UserFragment } from 'generated/graphql';

interface UserDetailsProps {
  user: UserFragment;
}

export const UserDetails: React.FC<UserDetailsProps> = ({ user }) => {
  return <SidebarButton icon={FiUser} label={`Hi, ${user?.username}`} href={`/user/${user?.username}`} />;
};

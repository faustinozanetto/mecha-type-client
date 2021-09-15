import React from 'react';
import { FiUser } from 'react-icons/fi';
import { SidebarButton } from '..';
import { User } from 'generated/graphql';

interface UserDetailsProps {
  user: User;
}

export const UserDetails: React.FC<UserDetailsProps> = ({ user }) => {
  return <SidebarButton icon={FiUser} label={`Hi, ${user?.name}`} href={`/user/${user?.name}`} />;
};

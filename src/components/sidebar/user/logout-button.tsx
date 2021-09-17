import React from 'react';
import FiLogOut from '@meronex/icons/fi/FiLogOut';
import { signOut } from 'next-auth/react';
import { SidebarButton } from '../sidebar-button';

export const LogoutButton: React.FC<{}> = ({}) => {
  return (
    <SidebarButton
      label="Logout"
      icon={FiLogOut}
      href=""
      onClick={async () => {
        signOut();
      }}
    />
  );
};

import React from 'react';
import { FiLogOut } from 'react-icons/fi';
import { signOut } from 'next-auth/react';
import { SidebarButton } from '..';

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

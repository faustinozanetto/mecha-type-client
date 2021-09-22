import React from 'react';
import FiLogOut from '@meronex/icons/fi/FiLogOut';
import { SidebarButton } from '../sidebar-button';
import { useRouter } from 'next/router';
import { __BACKEND__ } from '@utils/constants';
import { useLogoutMutation } from '@generated/graphql';

export const LogoutButton: React.FC<{}> = ({}) => {
  const router = useRouter();
  const [logout] = useLogoutMutation();
  return (
    <SidebarButton
      label="Logout"
      icon={FiLogOut}
      onClick={async () => {
        await logout();
      }}
    />
  );
};

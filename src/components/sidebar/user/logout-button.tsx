import React from 'react';
import FiLogOut from '@meronex/icons/fi/FiLogOut';
import { SidebarButton } from '../sidebar-button';
import axios from 'axios';
import { useRouter } from 'next/router';
import { __BACKEND__ } from '@utils/constants';

export const LogoutButton: React.FC<{}> = ({}) => {
  const router = useRouter();
  return (
    <SidebarButton
      label="Logout"
      icon={FiLogOut}
      onClick={async () => {
        await axios.get(`${__BACKEND__}/auth/logout`, { withCredentials: true }).then(() => {
          router.push('/');
        });
      }}
    />
  );
};

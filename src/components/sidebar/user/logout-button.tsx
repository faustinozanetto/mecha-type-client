import React from 'react';
import FiLogOut from '@meronex/icons/fi/FiLogOut';
import { SidebarButton } from '../sidebar-button';
import axios from 'axios';
import { useRouter } from 'next/router';

export const LogoutButton: React.FC<{}> = ({}) => {
  const router = useRouter();
  return (
    <SidebarButton
      label="Logout"
      icon={FiLogOut}
      href=""
      onClick={async () => {
        await axios.get('http://localhost:4000/api/auth/logout', { withCredentials: true }).then(() => {
          router.push('/');
        });
      }}
    />
  );
};

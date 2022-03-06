import React from 'react';
import FiLogOut from '@meronex/icons/fi/FiLogOut';
import Link from 'next/link';
import { SidebarButton } from '../sidebar-button';
import { __BACKEND__ } from '@utils/constants';
import { useRouter } from 'next/router';

interface LogoutButtonProps {
  /** Label to show in the button */
  label: string;
}

export const LogoutButton: React.FC<LogoutButtonProps> = ({ label }) => {
  const router = useRouter();
  return (
    <SidebarButton
      label={label}
      icon={FiLogOut}
      onClick={async () => {
        await fetch(__BACKEND__ + '/api/v1/auth/logout', {
          method: 'GET',
          credentials: 'include',
        }).then((res) => router.push('/'));
      }}
    />
  );
};

import React from 'react';
import FiLogOut from '@meronex/icons/fi/FiLogOut';
import Link from 'next/link';
import { SidebarButton } from '../sidebar-button';
import { __BACKEND__ } from '@utils/constants';

interface LogoutButtonProps {
  /** Label to show in the button */
  label: string;
}

export const LogoutButton: React.FC<LogoutButtonProps> = ({ label }) => {
  return (
    <Link href={'/'} passHref>
      <SidebarButton
        label={label}
        icon={FiLogOut}
        onClick={async () => {
          await fetch(__BACKEND__ + '/api/v1/auth/logout', {
            method: 'GET',
            credentials: 'include',
          });
        }}
      />
    </Link>
  );
};

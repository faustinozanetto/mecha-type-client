import React from 'react';
import FiLogOut from '@meronex/icons/fi/FiLogOut';
import { SidebarButton } from '../sidebar-button';
import { __BACKEND__ } from '@utils/constants';
import { useLogoutMutation } from '@generated/graphql';
import { useRouter } from 'next/router';

interface LogoutButtonProps {
  /** Label to show in the button */
  label: string;
}

export const LogoutButton: React.FC<LogoutButtonProps> = ({ label }) => {
  const router = useRouter();
  const [logout] = useLogoutMutation();
  return (
    <SidebarButton
      label={label}
      icon={FiLogOut}
      onClick={async () => {
        await fetch(__BACKEND__ + '/api/v1/auth/logout', {
          method: 'GET',
          credentials: 'include',
        }).then(async (res) => {
          const data = res.body;
          console.log(data);
          await router.push('/', null, { shallow: false });
        });
      }}
    />
  );
};

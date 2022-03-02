import React from 'react';
import FiLogIn from '@meronex/icons/fi/FiLogIn';
import { SidebarButton } from '../sidebar-button';
import { __BACKEND__ } from '@utils/constants';
import { useRouter } from 'next/router';
import Link from 'next/link';

interface LogoutButtonProps {
  /** Label to show in the button */
  label: string;
}

const LoginButton: React.FC<LogoutButtonProps> = ({ label }) => {
  const router = useRouter();

  return (
    <Link href={{ pathname: '/auth/signin', query: { back: router.asPath } }} passHref>
      <SidebarButton label={label} icon={FiLogIn} />
    </Link>
  );
};

export default LoginButton;

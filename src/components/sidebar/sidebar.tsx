import React from 'react';
import AiOutlineDashboard from '@meronex/icons/ai/AiOutlineDashboard';
import FiLogIn from '@meronex/icons/fi/FiLogIn';
import FaKeyboard from '@meronex/icons/fa/FaKeyboard';
import FiHome from '@meronex/icons/fi/FiHome';
import FiStar from '@meronex/icons/fi/FiStar';

import { UserFragment } from 'generated/graphql';
import { SidebarButton } from './sidebar-button';
import { LogoutButton, UserDetails } from './user';
import useMediaQuery from '@hooks/general/useMediaQuery';
import { Text, Flex } from '@chakra-ui/react';
import { __URI__ } from '@utils/constants';
import { SidebarThemeToggler } from './sidebar-theme-toggler';
import { useRouter } from 'next/router';

interface ISidebarLink {
  name: string;
  href: string;
  icon: any;
}

const sidebarLinks: ISidebarLink[] = [
  {
    name: 'Home',
    href: '/',
    icon: FiHome,
  },
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: AiOutlineDashboard,
  },
  {
    name: 'Practice',
    href: '/practice',
    icon: FaKeyboard,
  },
  {
    name: 'Leaderboards',
    href: '/leaderboards',
    icon: FiStar,
  },
];

interface SidebarProps {
  /** User data */
  user: UserFragment;
}

const Sidebar: React.FC<SidebarProps> = ({ user }) => {
  const router = useRouter();
  const isMediumOrMore = useMediaQuery('(min-width: 80em)');
  const isSmallOrLess = useMediaQuery('(max-width: 30em)');

  /**
   *
   * @returns the combined uri of the auth sign in and set next query
   * to the current page, so when sign in is completed it redirects to
   * the current page.
   */
  const generateSignInHref = (): string => {
    const base = '/auth/signin';
    const currentUri = router.asPath;
    return base.concat(`?next=${currentUri}`);
  };

  return (
    <Flex
      as="nav"
      display={isSmallOrLess ? 'none' : 'flex'}
      flexDir="column"
      position="fixed"
      float="left"
      height="100%"
      width={['80px', '80px', '80px', '80px', '250px']}
      backgroundColor="#111827"
      p={4}
    >
      {/* Title & Logo */}
      <Flex flexDir="column" alignItems="center" mb={4}>
        <Text as="span" fontWeight={800} fontSize="1.75rem" color="#fff" textAlign="center">
          {isMediumOrMore ? 'Mecha Type' : 'MT'}
        </Text>
      </Flex>
      {/* Buttons */}
      <Flex flexDirection="column" flexGrow={1} alignItems="center">
        {sidebarLinks.map((link, index) => {
          return <SidebarButton key={index} icon={link.icon} label={link.name} href={link.href} />;
        })}
      </Flex>

      {/* User details */}
      <Flex flexDir="column" flexGrow={0} alignItems="center">
        <SidebarThemeToggler />
        {user ? (
          <>
            <UserDetails user={user} />
            <LogoutButton />
          </>
        ) : (
          <SidebarButton icon={FiLogIn} label="Login" href={generateSignInHref()} />
        )}
      </Flex>
    </Flex>
  );
};

export default Sidebar;

import React from 'react';
import { AiOutlineDashboard } from 'react-icons/ai';
import { BiLogIn } from 'react-icons/bi';
import { FaKeyboard } from 'react-icons/fa';
import { FiHome, FiStar } from 'react-icons/fi';
import { User } from 'generated/graphql';
import { SidebarButton } from '.';
import { LogoutButton, UserDetails } from './user';
import useMediaQuery from '@hooks/general/useMediaQuery';
import { Text, Flex } from '@chakra-ui/react';
import { __URI__ } from '@utils/constants';
import { SidebarThemeToggler } from './sidebar-theme-toggler';

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
  user: User;
}

export const Sidebar: React.FC<SidebarProps> = ({ user }) => {
  const isMediumOrMore = useMediaQuery('(min-width: 80em)');
  const isSmallOrLess = useMediaQuery('(max-width: 30em)');

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
        {user && (
          <>
            <UserDetails user={user} />
            <LogoutButton />
          </>
        )}
        {!user && <SidebarButton icon={BiLogIn} label="Login" href={`${__URI__}/api/auth/signin`} />}
      </Flex>
    </Flex>
  );
};

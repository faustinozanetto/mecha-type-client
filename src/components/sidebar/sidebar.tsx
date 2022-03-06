import React from 'react';
import AiOutlineDashboard from '@meronex/icons/ai/AiOutlineDashboard';
import FiLogIn from '@meronex/icons/fi/FiLogIn';
import FaKeyboard from '@meronex/icons/fa/FaKeyboard';
import FiHome from '@meronex/icons/fi/FiHome';
import FiStar from '@meronex/icons/fi/FiStar';

import { User } from 'generated/graphql';
import { SidebarButton } from './sidebar-button';
import { LogoutButton, UserDetails } from './user';
import useMediaQuery from '@hooks/general/useMediaQuery';
import { Text, Flex, useColorModeValue } from '@chakra-ui/react';
import { __URI__ } from '@utils/constants';
import { SidebarThemeToggler } from './sidebar-theme-toggler';
import { useRouter } from 'next/router';
import { SidebarLanguageSwitcher } from './sidebar-language-siwtcher';
import { useTranslation } from 'next-i18next';
import LoginButton from './user/login-button';
import Link from 'next/link';
import MechaTypeLogo from '@components/branding/mechatype-logo';
import MechaTypeLogoInitials from '@components/branding/mechatype-initials';

interface ISidebarLink {
  name: string;
  href: string;
  icon: any;
}

const sidebarLinks: ISidebarLink[] = [
  {
    name: 'sidebar-home',
    href: '/',
    icon: FiHome,
  },
  {
    name: 'sidebar-dashboard',
    href: '/dashboard',
    icon: AiOutlineDashboard,
  },
  {
    name: 'sidebar-practice',
    href: '/practice',
    icon: FaKeyboard,
  },
  {
    name: 'sidebar-leaderboards',
    href: '/leaderboards',
    icon: FiStar,
  },
];

export interface SidebarProps {
  /** User data */
  user: User;
}

const Sidebar: React.FC<SidebarProps> = ({ user }) => {
  const router = useRouter();
  const { t } = useTranslation('sidebar');
  const logoColor = useColorModeValue('black', 'white');
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
      bg={useColorModeValue('gray.50', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}
      p={4}
    >
      {/* Title & Logo */}
      <Flex flexDir="row" justifyContent="center" alignContent="center" alignItems="center" mb={4}>
        <Text as="h1" fontWeight={700} fontSize="1.75rem" color="#fff" textAlign="center">
          {isMediumOrMore ? <MechaTypeLogo color={logoColor} /> : <MechaTypeLogoInitials color={logoColor} />}
        </Text>
      </Flex>
      {/* Buttons */}
      <Flex flexDirection="column" flexGrow={1} alignItems="center">
        {sidebarLinks.map((link, index) => {
          return (
            <Link key={index} href={link.href} passHref>
              <SidebarButton icon={link.icon} label={t(link.name)} />
            </Link>
          );
        })}
      </Flex>

      {/* User details */}
      <Flex flexDir="column" flexGrow={0} alignItems="center">
        <SidebarLanguageSwitcher
          label={t('sidebar-language-switcher')}
          englishLabel={t('sidebar-language-switcher-english')}
          spanishLabel={t('sidebar-language-switcher-spanish')}
        />
        <SidebarThemeToggler label={t('sidebar-theme-switcher')} />
        {user?.id ? (
          <>
            <UserDetails user={user} />
            <LogoutButton label={t('sidebar-logout')} />
          </>
        ) : (
          <LoginButton label={t('sidebar-login')} />
        )}
      </Flex>
    </Flex>
  );
};

export default Sidebar;

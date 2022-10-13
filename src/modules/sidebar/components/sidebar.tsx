import useMediaQuery from '@hooks/use-media-query';
import MechaTypeLogo from '@modules/branding/components/mecha-type-logo';
import MechaTypeLogoInitials from '@modules/branding/components/mecha-type-logo-initials';
import { usePreferencesContext } from '@modules/preferences/context/preferences-context';
import { ActionType } from '@modules/preferences/context/reducer/types';
import Button from '@modules/ui/components/button/button';
import clsx from 'clsx';
import { useSession } from 'next-auth/react';
import React, { memo, useEffect } from 'react';

import { useSidebarContext } from '../context/sidebar-context';
import SidebarLink from './sidebar-link';
import SidebarToggleButton from './sidebar-toggle-button';
import SidebarUserDetails from './user-details/sidebar-user-details';

const SIDEBAR_LINKS: React.ComponentPropsWithoutRef<typeof SidebarLink>[] = [
  {
    href: '/',
    children: 'Home',
    leftIcon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="h-6 w-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
        />
      </svg>
    ),
  },
  {
    href: '/dashboard',
    children: 'Dashbord',
    leftIcon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="h-6 w-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 13.5V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 010 3m0-3a1.5 1.5 0 000 3m0 9.75V10.5"
        />
      </svg>
    ),
  },
  {
    href: '/practice',
    children: 'Practice',
    leftIcon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="h-6 w-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"
        />
      </svg>
    ),
  },
  {
    href: '/leaderboards',
    children: 'Leaderboards',
    leftIcon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="h-6 w-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
        />
      </svg>
    ),
  },
];

const Sidebar: React.FC = () => {
  const { data: session, status } = useSession();
  const { dispatch } = usePreferencesContext();
  const { isCollapsed, setIsCollapsed } = useSidebarContext();
  const isMediumDevice = useMediaQuery('(max-width: 768px');
  const isSmallDevice = useMediaQuery('(max-width: 400px');

  // Automatically collapse or not the sidebar if device is small or not.
  useEffect(() => {
    setIsCollapsed(isMediumDevice);
  }, [isMediumDevice]);

  const handlePreferencesMenuOpen = () => {
    dispatch({
      type: ActionType.SET_PREFERENCES_MENU_OPEN,
      payload: {
        open: true,
      },
    });
  };

  // Is device is smaller than xs, show a floating button to togle the sidebar.
  if (isSmallDevice) return null;

  return (
    <aside
      className={clsx(
        'float-left flex h-full flex-col space-y-4 bg-sidebar p-4 text-white',
        isCollapsed ? 'w-[80px]' : 'w-full'
      )}
    >
      {/* Logo & Toggler */}
      <div className={clsx('flex items-center justify-center', isCollapsed ? '' : 'space-x-2')}>
        {/* Show big logo when not collapsed */}
        {!isCollapsed && <MechaTypeLogo />}
        {/* Show initials logo when device is small and not collapsed */}
        {isMediumDevice && <MechaTypeLogoInitials />}
        {/* Only show collapse button when device is bigger than md. */}
        {!isMediumDevice && <SidebarToggleButton />}
      </div>
      {/* Links */}
      <nav className={clsx('flex grow flex-col space-y-2', !isCollapsed && 'w-full')}>
        {SIDEBAR_LINKS.map((link, index) => {
          return (
            <SidebarLink key={index} href={link.href} leftIcon={link.leftIcon}>
              {link.children}
            </SidebarLink>
          );
        })}
      </nav>

      <Button onClick={handlePreferencesMenuOpen}>Preferences</Button>

      {/* User Information  */}
      {session?.user?.name && <SidebarUserDetails user={session.user} />}

      {status === 'unauthenticated' && (
        <SidebarLink
          href="/api/auth/signin"
          leftIcon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
              />
            </svg>
          }
        >
          Sign In
        </SidebarLink>
      )}
    </aside>
  );
};

export default memo(Sidebar);

import useLoggedUser from '@hooks/use-logged-user';
import React from 'react';
import SidebarLink from '../sidebar-link';

interface ISidebarUserDetailsProps {
  /** Wether the sidebar is collapsed or not. */
  isCollapsed: boolean;
}

const SidebarUserDetails: React.FC<ISidebarUserDetailsProps> = (props) => {
  const { isCollapsed } = props;
  const { user, isLoggedIn } = useLoggedUser();

  return (
    <div className="flex grow-0 flex-col">
      {!isLoggedIn && (
        <SidebarLink
          href="/auth/signin"
          isCollapsed={isCollapsed}
          leftIcon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
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
      {isLoggedIn && user && (
        <>
          <h2>Hi {user.name}</h2>
          <SidebarLink
            href="api/auth/signout"
            isCollapsed={isCollapsed}
            leftIcon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
                />
              </svg>
            }
          >
            Sign Out
          </SidebarLink>
        </>
      )}
    </div>
  );
};

export default SidebarUserDetails;

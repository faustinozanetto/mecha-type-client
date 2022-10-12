import type { User } from 'next-auth';
import React from 'react';

import SidebarLink from '../sidebar-link';

interface ISidebarUserDetailsProps {
  user: User;
}

const SidebarUserDetails: React.FC<ISidebarUserDetailsProps> = (props) => {
  const { user } = props;

  return (
    <div className="flex flex-col space-y-2">
      <SidebarLink
        href={`/user/${user.name}`}
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
              d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
            />
          </svg>
        }
      >
        Hi {user.name}
      </SidebarLink>
      <SidebarLink
        href="/api/auth/signout"
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
        Sign Out
      </SidebarLink>
    </div>
  );
};

export default SidebarUserDetails;

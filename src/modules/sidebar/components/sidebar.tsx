import MechaTypeLogo from '@modules/branding/components/mecha-type-logo';
import React from 'react';

import SidebarLink from './sidebar-link';

const Sidebar: React.FC = () => {
  return (
    <aside className="float-left flex h-full flex-col bg-primary-800 p-4 text-white space-y-4">
      {/* Logo */}
      <MechaTypeLogo />
      {/* Links */}
      <nav className="flex w-full flex-col space-y-2">
        <SidebarLink href="">Home</SidebarLink>
        <SidebarLink href="/dashboard">Dashboard</SidebarLink>
        <SidebarLink href="/practice">Practice</SidebarLink>
        <SidebarLink href="/leaderboards">Leaderboards</SidebarLink>
      </nav>

      {/* User Information  */}
    </aside>
  );
};

export default Sidebar;

import Button from '@modules/ui/components/button/button';
import React from 'react';
import { useSidebarContext } from '../context/sidebar-context';

const SidebarToggleButton: React.FC = () => {
  const { toggle } = useSidebarContext();
  return (
    <Button
      size="sm"
      variant="outline"
      aria-label="Toggle Sidebar"
      onClick={toggle}
      style={{
        color: 'white',
      }}
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
            d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
          />
        </svg>
      }
    />
  );
};

export default SidebarToggleButton;

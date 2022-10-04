import type { IButtonProps } from '@modules/ui/components/button/button';
import Button from '@modules/ui/components/button/button';
import Link from 'next/link';
import React from 'react';

interface ISidebarLinkProps extends IButtonProps {
  /** Path to navigate when interacted. */
  href: string;
  /** Wether the sidebar is collapsed or not. */
  isCollapsed: boolean;
}

const SidebarLink: React.FC<ISidebarLinkProps> = (props) => {
  const { href, isCollapsed, children, ...rest } = props;

  return (
    <Link href={href}>
      <Button size={isCollapsed ? 'sm' : 'md'} aria-label={`${children} Link`} style={{}} {...rest}>
        {!isCollapsed && <span>{children}</span>}
      </Button>
    </Link>
  );
};

export default SidebarLink;

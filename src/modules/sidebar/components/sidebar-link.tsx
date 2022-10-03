import type { IButtonProps } from '@modules/ui/components/button/button';
import Button from '@modules/ui/components/button/button';
import Link from 'next/link';
import React from 'react';

interface ISidebarLinkProps extends IButtonProps {
  /** Path to navigate when interacted. */
  href: string;
  isCollapsed: boolean;
}

const SidebarLink: React.FC<ISidebarLinkProps> = (props) => {
  const { href, children, ...rest } = props;

  return (
    <Link href={href}>
      <Button aria-label={`${children} Link`} {...rest}>
        <span> {children}</span>
      </Button>
    </Link>
  );
};

export default SidebarLink;

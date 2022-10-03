import type { IButtonProps } from '@modules/ui/components/button/button';
import Button from '@modules/ui/components/button/button';
import Link from 'next/link';
import React from 'react';

interface ISidebarLinkProps extends IButtonProps {
  href: string;
}

const SidebarLink: React.FC<ISidebarLinkProps> = (props) => {
  const { href, children, ...rest } = props;

  return (
    <Link href={href}>
      <Button {...rest}>{children}</Button>
    </Link>
  );
};

export default SidebarLink;

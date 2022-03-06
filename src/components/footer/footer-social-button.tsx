import { Button, useColorModeValue, VisuallyHidden } from '@chakra-ui/react';
import React, { ReactNode } from 'react';

interface FooterSocialButtonProps {
  children: ReactNode;
  label: string;
  href: string;
}

const FooterSocialButton: React.FC<FooterSocialButtonProps> = (props) => {
  const { label, href, children } = props;
  return (
    <Button
      bg={useColorModeValue('blackAlpha.100', 'whiteAlpha.100')}
      rounded="full"
      w={12}
      h={12}
      cursor="pointer"
      as="a"
      href={href}
      display="inline-flex"
      alignItems="center"
      justifyContent="center"
      transition="background 0.3s ease"
      _hover={{
        bg: useColorModeValue('blackAlpha.200', 'whiteAlpha.200'),
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </Button>
  );
};

export default FooterSocialButton;

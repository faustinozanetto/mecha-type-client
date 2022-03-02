import React from 'react';
import { Button, Tooltip, HStack, Icon, Text } from '@chakra-ui/react';
import useMediaQuery from '@hooks/general/useMediaQuery';
import Link from 'next/link';

interface SidebarButtonProps {
  /**
   * Icon to render on the left of the label.
   */
  icon: any;
  /**
   * Label to render on the button
   */
  label: string;
  /**
   * Href tag to parse to the button.
   */
  href?: string;
  /**
   * On Click event to pass to the onclick of the button.
   */
  onClick?: () => void;
}

export const SidebarButton = React.forwardRef<any, SidebarButtonProps>((props, ref) => {
  const { icon, label, href, onClick, ...rest } = props;
  const isMediumOrMore = useMediaQuery('(min-width: 80em)');

  return (
    <Tooltip label={label} placement="right" aria-label={`${label} tooltip`} isDisabled={isMediumOrMore}>
      <Button
        as="a"
        href={href}
        ref={ref}
        variant="ghost"
        borderRadius="md"
        size="lg"
        color="#fff"
        my={2}
        width={['auto', 'auto', 'auto', 'auto', '100%']}
        justifyContent={['center', 'center', 'center', 'center', 'flex-start']}
        paddingInline={[0, 0, 0, 4, 4]}
        onClick={onClick}
        _hover={{
          color: 'hsl(210deg,30%,8%)!important',
          backgroundColor: '#fff',
        }}
        {...rest}
      >
        <HStack alignItems="center">
          <Icon as={icon} w={6} h={6} />
          {isMediumOrMore && <Text>{label}</Text>}
        </HStack>
      </Button>
    </Tooltip>
  );
});

SidebarButton.displayName = 'SidebarButton';

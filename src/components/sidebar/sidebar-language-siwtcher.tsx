import React from 'react';
import Link from 'next/link';
import useMediaQuery from '@hooks/general/useMediaQuery';
import { Button, Tooltip, Text, HStack, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import { AtSignIcon } from '@chakra-ui/icons';

interface SidebarLanguageSwitcherProps {
  /** Label to show in the button */
  label: string;
  englishLabel: string;
  spanishLabel: string;
}

export const SidebarLanguageSwitcher: React.FC<SidebarLanguageSwitcherProps> = ({
  label,
  englishLabel,
  spanishLabel,
}) => {
  const isMediumOrMore = useMediaQuery('(min-width: 80em)');

  return (
    <Menu placement="right" size="sm">
      <Tooltip label={label} placement="right" aria-label="Switch Language Tooltip" isDisabled={isMediumOrMore}>
        <MenuButton
          as={Button}
          aria-label={label}
          variant="ghost"
          borderRadius="md"
          size="lg"
          color="#fff"
          my={1}
          width={['auto', 'auto', 'auto', 'auto', '100%']}
          justifyContent={['center', 'center', 'center', 'center', 'flex-start']}
          paddingInline={[0, 0, 0, 4, 4]}
          _hover={{
            color: 'hsl(210deg,30%,8%)!important',
            backgroundColor: '#fff',
          }}
        >
          <HStack alignItems="center">
            <AtSignIcon w={5} h={5} />
            {isMediumOrMore && <Text>{label}</Text>}
          </HStack>
        </MenuButton>
      </Tooltip>
      <MenuList>
        <MenuItem>
          <Link href="/" locale={'en'} passHref>
            {englishLabel}
          </Link>
        </MenuItem>
        <MenuItem>
          <Link href="/" locale={'es'} passHref>
            {spanishLabel}
          </Link>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

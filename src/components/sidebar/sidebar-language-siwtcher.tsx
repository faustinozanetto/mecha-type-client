import React from 'react';
import Link from 'next/link';
import useMediaQuery from '@hooks/general/useMediaQuery';
import { Button, Tooltip, Text, HStack, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import { AtSignIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/router';

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
  const router = useRouter();
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
          my={1}
          width={['auto', 'auto', 'auto', 'auto', '100%']}
          justifyContent={['center', 'center', 'center', 'center', 'flex-start']}
          paddingInline={[0, 0, 0, 4, 4]}
        >
          <HStack alignItems="center">
            <AtSignIcon w={5} h={5} />
            {isMediumOrMore && <Text>{label}</Text>}
          </HStack>
        </MenuButton>
      </Tooltip>
      <MenuList>
        <MenuItem onClick={() => router.push(router.asPath, router.asPath, { locale: 'en' })}>{englishLabel}</MenuItem>
        <Link href={router.asPath} locale={'es'}>
          <MenuItem>{spanishLabel}</MenuItem>
        </Link>
      </MenuList>
    </Menu>
  );
};

import React from 'react';
import useMediaQuery from '@hooks/general/useMediaQuery';
import { Button, Tooltip, Text, useColorMode, HStack } from '@chakra-ui/react';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';

interface SidebarThemeTogglerProps {
  /** Label to show in the button */
  label?: string;
}

export const SidebarThemeToggler: React.FC<SidebarThemeTogglerProps> = ({ label }) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const isMediumOrMore = useMediaQuery('(min-width: 80em)');

  return (
    <Tooltip label={label} placement="right" aria-label="Switch Theme Tooltip" isDisabled={isMediumOrMore}>
      <Button
        aria-label={label}
        variant="ghost"
        borderRadius="md"
        size="lg"
        my={1}
        width={['auto', 'auto', 'auto', 'auto', '100%']}
        justifyContent={['center', 'center', 'center', 'center', 'flex-start']}
        paddingInline={[0, 0, 0, 4, 4]}
        onClick={toggleColorMode}
      >
        <HStack alignItems="center">
          {colorMode === 'dark' ? <SunIcon w={5} h={5} /> : <MoonIcon w={5} h={5} />}
          {isMediumOrMore && label && <Text>{label}</Text>}
        </HStack>
      </Button>
    </Tooltip>
  );
};

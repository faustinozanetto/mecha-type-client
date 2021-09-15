import React from 'react';
import { Button, Tooltip, Text, useColorMode, HStack } from '@chakra-ui/react';
import { SunIcon, MoonIcon } from '@chakra-ui/icons';
import useMediaQuery from '@hooks/general/useMediaQuery';

interface SidebarThemeTogglerProps {}

export const SidebarThemeToggler: React.FC<SidebarThemeTogglerProps> = ({}) => {
  const { colorMode, toggleColorMode } = useColorMode();
  const isMediumOrMore = useMediaQuery('(min-width: 80em)');

  return (
    <Tooltip label="Switch Theme" placement="right" aria-label="Switch Theme Tooltip" isDisabled={isMediumOrMore}>
      <Button
        aria-label="Switch Theme"
        variant="ghost"
        borderRadius="md"
        size="lg"
        color="#fff"
        my={1}
        width={['auto', 'auto', 'auto', 'auto', '100%']}
        justifyContent={['center', 'center', 'center', 'center', 'flex-start']}
        paddingInline={[0, 0, 0, 4, 4]}
        onClick={toggleColorMode}
        _hover={{
          color: 'hsl(210deg,30%,8%)!important',
          backgroundColor: '#fff',
        }}
      >
        <HStack alignItems="center">
          {colorMode === 'dark' ? <SunIcon w={5} h={5} /> : <MoonIcon w={5} h={5} />}
          {isMediumOrMore && <Text>Switch Theme</Text>}
        </HStack>
      </Button>
    </Tooltip>
  );
};

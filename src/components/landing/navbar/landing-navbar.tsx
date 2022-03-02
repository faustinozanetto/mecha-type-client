import React from 'react';
import { Box, Text, Container, Flex, HStack, useColorModeValue } from '@chakra-ui/react';
import { SidebarThemeToggler } from '@components/sidebar/sidebar-theme-toggler';

interface LandingNavbarProps {}

const LandingNavbar: React.FC<LandingNavbarProps> = (props): JSX.Element => {
  const {} = props;

  return (
    <Box as="nav" backgroundColor="#111827" height={20} boxShadow="2xl">
      <Container height="full" maxW="container.lg">
        <Flex justifyContent="space-between" height="full">
          {/* Left */}
          <HStack alignItems="center">
            <Text as="h1" fontWeight={700} fontSize="2rem" color="#fff" textAlign="center">
              Mecha Type
            </Text>
          </HStack>
          {/* Right */}
          <HStack>
            <SidebarThemeToggler />
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
};

export default LandingNavbar;

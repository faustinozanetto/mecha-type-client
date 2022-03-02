import React from 'react';
import { Box, Text, Container, Heading, Stack, useColorModeValue, Button } from '@chakra-ui/react';

interface LandingHeroProps {}

const LandingHero: React.FC<LandingHeroProps> = ({}) => {
  return (
    <Box backgroundColor={useColorModeValue('gray.100', 'gray.700')} py={4}>
      <Container maxW="4xl">
        <Stack as={Box} textAlign="center" spacing={{ base: 8, md: 14 }} py={{ base: 20, md: 36 }}>
          <Heading fontWeight={800} fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }} lineHeight="110%">
            Improving your typing <br />
            <Text as="span" color={useColorModeValue('blue.400', 'blue.300')}>
              has never been this easy
            </Text>
          </Heading>
          <Text color={useColorModeValue('gray.500', 'gray.300')} fontSize="lg">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente at libero facere error optio placeat
            praesentium facilis tempora aspernatur est inventore dicta delectus, autem, cumque recusandae. Repellendus
            ducimus molestiae similique.
          </Text>
          <Stack direction="column" spacing={3} align="center" alignSelf="center" position="relative">
            <Button colorScheme="blue" rounded="2xl" size="lg">
              Get Started
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
};

export default LandingHero;

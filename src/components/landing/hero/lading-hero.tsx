import React from 'react';
import { Box, Text, Container, Heading, Stack } from '@chakra-ui/react';

interface LandingHeroProps {}

const LandingHero: React.FC<LandingHeroProps> = ({}) => {
  return (
    <Container maxW="3xl">
      <Stack as={Box} textAlign="center" spacing={{ base: 8, md: 14 }} py={{ base: 20, md: 36 }}>
        <Heading fontWeight={700} fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }} lineHeight="110%">
          Improving your typing <br />
          <Text as="span" color="blue.400">
            has never been this easy
          </Text>
        </Heading>
        <Text color="gray.500" fontSize="lg">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente at libero facere error optio placeat
          praesentium facilis tempora aspernatur est inventore dicta delectus, autem, cumque recusandae. Repellendus
          ducimus molestiae similique.
        </Text>
        <Stack direction="column" spacing={3} align="center" alignSelf="center" position="relative"></Stack>
      </Stack>
    </Container>
  );
};

export default LandingHero;

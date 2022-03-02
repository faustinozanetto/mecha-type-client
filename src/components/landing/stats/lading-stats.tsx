import React from 'react';
import { Box, Text, Container, Heading, Stack, useColorModeValue, Button, SimpleGrid } from '@chakra-ui/react';
import LandingStatsCard from './landing-stats-card';

interface LandingStatsProps {}

const LandingStats: React.FC<LandingStatsProps> = ({}) => {
  return (
    <Box backgroundColor={useColorModeValue('gray.100', 'gray.700')} py={4}>
      <Container maxW="4xl">
        <Stack as={Box} textAlign="center" spacing={{ base: 8, md: 14 }} py={{ base: 20, md: 36 }}>
          <Heading fontWeight={800} fontSize={{ base: '2xl', sm: '4xl', md: '6xl' }} lineHeight="110%">
            How it´s performing
          </Heading>
          <Text color={useColorModeValue('gray.500', 'gray.300')} fontSize="lg">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente at libero facere error optio placeat
            praesentium facilis tempora aspernatur est inventore dicta delectus, autem, cumque recusandae. Repellendus
            ducimus molestiae similique.
          </Text>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 4, lg: 8 }}>
            <LandingStatsCard title="All time Users" stat={1000} />
            <LandingStatsCard title="All time Users" stat={1000} />
            <LandingStatsCard title="All time Users" stat={1000} />
          </SimpleGrid>
        </Stack>
      </Container>
    </Box>
  );
};

export default LandingStats;

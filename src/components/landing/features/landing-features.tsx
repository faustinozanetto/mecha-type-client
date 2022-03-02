import React from 'react';
import {
  Box,
  Text,
  Container,
  Heading,
  Stack,
  useColorModeValue,
  SimpleGrid,
  HStack,
  Icon,
  VStack,
} from '@chakra-ui/react';
import { CheckIcon } from '@chakra-ui/icons';
import { features } from 'process';

interface FeatureType {
  title: string;
  description: string;
}

const FEATURES: FeatureType[] = Array.apply(null, Array(4)).map(function (x, i) {
  return {
    title: 'Lorem ipsum dolor sit amet',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam, modi.',
  };
});

interface LandingFeaturesProps {}

const LandingFeatures: React.FC<LandingFeaturesProps> = ({}) => {
  const featureTextColor = useColorModeValue('gray.500', 'gray.300');
  return (
    <Box backgroundColor={useColorModeValue('gray.200', 'gray.900')} py={4}>
      <Container maxW="5xl">
        {/* Top */}
        <Stack as={Box} textAlign="center" spacing={{ base: 8, md: 14 }} py={16}>
          <Heading fontWeight={800} fontSize={{ base: '2xl', sm: '4xl', md: '5xl' }} lineHeight="110%">
            Why use MechaType?
          </Heading>
          <Text color={useColorModeValue('gray.500', 'gray.300')} fontSize="lg">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente at libero facere error optio placeat
            praesentium facilis tempora aspernatur est inventore dicta delectus, autem, cumque recusandae. Repellendus
            ducimus molestiae similique.
          </Text>
        </Stack>
        <Container maxW="6xl" pb={16}>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={10}>
            {FEATURES.map((feat, index) => {
              return (
                <HStack key={index} align="top">
                  <Box color="blue.400" px={2}>
                    <Icon as={CheckIcon} boxSize={4} />
                  </Box>
                  <VStack align="start">
                    <Text fontWeight={600}>{feat.title}</Text>
                    <Text as="p" color={featureTextColor}>
                      {feat.description}
                    </Text>
                  </VStack>
                </HStack>
              );
            })}
          </SimpleGrid>
        </Container>
      </Container>
    </Box>
  );
};

export default LandingFeatures;

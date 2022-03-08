import React from 'react';
import { Box, Text, Container, Heading, Stack, useColorModeValue, Button, Flex, VStack } from '@chakra-ui/react';
import Link from 'next/link';
import Image from 'next/image';

interface PageNotFoundProps {}

const PageNotFound: React.FC<PageNotFoundProps> = ({}) => {
  return (
    <Container maxW="4xl">
      <Stack as={Box} textAlign="center" spacing={{ base: 8, md: 10 }} py={{ base: 20, md: 36 }}>
        <VStack>
          <Heading as="h1" fontWeight={800} fontSize={{ base: '3xl', sm: '4xl', md: '6xl' }}>
            An error occurred!
          </Heading>
          <Heading as="h2" fontWeight={800} fontSize={{ base: '2xl', sm: '3xl', md: '4xl' }}>
            The page you requested does not exist.
          </Heading>
        </VStack>
        <Text color={useColorModeValue('gray.500', 'gray.300')} fontSize="lg">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente at libero facere error optio placeat
          praesentium facilis tempora aspernatur est inventore dicta delectus, autem, cumque recusandae. Repellendus
          ducimus molestiae similique.
        </Text>
        <Box width="full">
          <Image src="/images/page-not-found.svg" alt="Page error" width="1200px" height="500px" />
        </Box>
        <Stack direction="column" spacing={3} align="center" alignSelf="center" width="full">
          <Link href="/" passHref={true}>
            <Button colorScheme="blue" rounded="0" size="lg" width="12rem" fontWeight={700} boxShadow="lg">
              Go to Home
            </Button>
          </Link>
        </Stack>
      </Stack>
    </Container>
  );
};

export default PageNotFound;

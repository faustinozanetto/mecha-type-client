import React from 'react';
import { Heading, VStack, Text, useColorModeValue, Box, Flex, Button, Container } from '@chakra-ui/react';
import { ProviderType } from '@pages/auth/signin';
import { SignInOption } from './sing-in-option';
import { useRouter } from 'next/router';
import Link from 'next/link';

interface UserSignInProps {
  providers: ProviderType[];
}

export const UserSignIn: React.FC<UserSignInProps> = ({ providers }) => {
  const router = useRouter();

  return (
    <VStack
      p={6}
      my={12}
      minWidth="sm"
      justify="center"
      rounded="3xl"
      backgroundColor={useColorModeValue('gray.300', 'gray.900')}
    >
      <Flex flexDir="column" width="100%" justify="center" p={4}>
        <Heading as="h1" fontSize="5xl" color={useColorModeValue('black', 'white')} fontWeight={700}>
          Sign In
        </Heading>
        <Text as="h2" mt={2}>
          Available Options
        </Text>
      </Flex>

      {/* Options */}
      <VStack width="100%" spacing={4} rounded="2xl">
        {providers &&
          providers?.map((provider, index) => {
            return <SignInOption key={provider.id + index} provider={provider} />;
          })}
        <Container maxWidth="md">
          <Text textAlign="center" fontSize="md" opacity={0.75}>
            Keep in mind that by using providers such as Discord or Github, we only need the username, photo and
            anything else. Now data is being compromised nor used for other purposes, Thanks.
          </Text>
        </Container>
        {/* Go back button */}
        <Link href={(router.query.back as string) ?? '/practice'} passHref={true}>
          <Button variant="solid" colorScheme="blue" size="lg" width="90%" mt={4}>
            Go back
          </Button>
        </Link>
      </VStack>
    </VStack>
  );
};

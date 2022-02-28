import React from 'react';
import { Container, Flex, useColorModeValue } from '@chakra-ui/react';
import { UserSignIn } from '@components/auth/signin/user-sign-in';
import { NextSeo } from 'next-seo';
import { GetServerSideProps } from 'next';
import { __BACKEND__ } from '@utils/constants';

export type ProviderType = {
  id: string;
  name: string;
  authUrl: string;
};

const PROVIDERS = [
  {
    id: 'discord',
    name: 'Discord',
    authUrl: `${__BACKEND__}/api/v1/auth/discord/login`,
  },
  {
    id: 'google',
    name: 'Google',
    authUrl: `${__BACKEND__}/api/v1/auth/google/login`,
  },
  {
    id: 'github',
    name: 'Github',
    authUrl: `${__BACKEND__}/api/v1/auth/github/login`,
  },
];

interface PracticePageProps {}

const SignIn: React.FC<PracticePageProps> = ({}) => {
  return (
    <Flex backgroundColor={useColorModeValue('gray.200', 'gray.800')}>
      <NextSeo
        title={`Sign In | Mecha Type`}
        description="Sign In page with many options such as Discord and Google."
        canonical={`auth/signin`}
        openGraph={{
          type: 'website',
          locale: 'en_US',
          url: 'auth/signin',
          site_name: 'Mecha Type',
        }}
      />
      <Container
        maxW={['1xl', '2xl', '3xl', '4xl']}
        paddingTop="1rem"
        paddingBottom="1rem"
        minHeight="100vh"
        centerContent
      >
        {PROVIDERS && <UserSignIn providers={PROVIDERS} />}
      </Container>
    </Flex>
  );
};

export default SignIn;

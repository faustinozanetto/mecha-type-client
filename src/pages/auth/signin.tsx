import React from 'react';
import { GetServerSideProps } from 'next';
import { getProviders } from 'next-auth/react';
import { Container, Flex, useColorModeValue } from '@chakra-ui/react';
import { UserSignIn } from '@components/auth/singin/user-sign-in';
import { NextSeo } from 'next-seo';

export type ProviderType = {
  callbackUrl: string;
  id: string;
  name: string;
  signinUrl: string;
  type: string;
};

interface PracticePageProps {
  providers: ProviderType[];
}

const SignIn: React.FC<PracticePageProps> = ({ providers }) => {
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
        <UserSignIn providers={providers} />
      </Container>
    </Flex>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  let parsedProviders: ProviderType[] = [];
  await getProviders().then((data) => {
    if (data) {
      parsedProviders = [
        {
          id: data.discord.id,
          callbackUrl: data.discord.callbackUrl,
          name: data.discord.name,
          signinUrl: data.discord.signinUrl,
          type: data.discord.type,
        },
        {
          id: data.google.id,
          callbackUrl: data.google.callbackUrl,
          name: data.google.name,
          signinUrl: data.google.signinUrl,
          type: data.google.type,
        },
        {
          id: data.github.id,
          callbackUrl: data.github.callbackUrl,
          name: data.github.name,
          signinUrl: data.github.signinUrl,
          type: data.github.type,
        },
      ];
    }
  });

  return {
    props: { providers: parsedProviders },
  };
};

export default SignIn;

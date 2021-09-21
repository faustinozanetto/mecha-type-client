import React, { useEffect, useState } from 'react';
import { Container, Flex, useColorModeValue } from '@chakra-ui/react';
import { UserSignIn } from '@components/auth/singin/user-sign-in';
import { NextSeo } from 'next-seo';
import { GetServerSideProps } from 'next';
import { __BACKEND__ } from '@utils/constants';

export type ProviderType = {
  id: string;
  name: string;
  authUrl: string;
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
        {providers && <UserSignIn providers={providers} />}
      </Container>
    </Flex>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  let providers: ProviderType[] = [];
  await fetch(`${__BACKEND__}/auth/providers`, {
    method: 'GET',
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw response;
    })
    .then((data) => {
      providers = data;
    });
  return { props: providers };
};

export default SignIn;

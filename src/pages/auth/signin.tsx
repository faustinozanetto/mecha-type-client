import React from 'react';
import { GetServerSideProps } from 'next';
import { getProviders } from 'next-auth/react';
import Head from 'next/head';
import { Container, Heading, Button } from '@chakra-ui/react';
import { useRouter } from 'next/router';

interface PracticePageProps {
  providers: any[];
}

const SignIn: React.FC<PracticePageProps> = ({ providers }) => {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Practice | Mecha Type</title>
        <meta name="description" content="The best place to improve your writing skills and have fun!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container maxW={['1xl, 2xl, 3xl, 4xl']} paddingTop="1rem" paddingBottom="1rem" minHeight="100vh" centerContent>
        <Heading>Sign In</Heading>
      </Container>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const providers = await getProviders();
  return {
    props: { providers },
  };
};

export default SignIn;

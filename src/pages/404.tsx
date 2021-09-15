import React from 'react';
import Head from 'next/head';
import { NotFoundError } from '@components/not-found';
import { Container } from '@chakra-ui/react';

const NotFoundPage: React.FC<{}> = () => {
  return (
    <>
      <Head>
        <title>Not Found | Mecha Type</title>
        <meta name="description" content="The best place to improve your writing skills and have fun!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container centerContent>
        <NotFoundError />
      </Container>
    </>
  );
};

export default NotFoundPage;

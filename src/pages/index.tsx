import { trpc } from '@lib/trpc';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Layout from '@modules/layouts/components/layout';
import Button from '@modules/ui/components/button/button';
import React, { useState } from 'react';

const Home: React.FC = ({}) => {
  const [num, setNumber] = useState<number>();
  trpc.randomNumber.useSubscription(undefined, {
    onData(n) {
      setNumber(n);
    },
  });

  return (
    <Layout
      headProps={{
        title: 'Home | Mecha Type',
      }}
    >
      <Button>Mecha Type</Button>
      <Button variant="outline">Mecha Type</Button>
      <h1>
        {' '}
        Here&apos;s a random number from a sub: {num} <br />
      </h1>
      <ReactQueryDevtools initialIsOpen={false} />
    </Layout>
  );
};

export default Home;

import { trpc } from '@lib/trpc';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import Layout from '@modules/layouts/components/layout';
import Button from '@modules/ui/components/button/button';
import React from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';

const Home: React.FC = ({}) => {
  const helloNoArgs = trpc.hello.useQuery();
  const { data: session } = useSession();

  return (
    <Layout
      headProps={{
        title: 'Home | Mecha Type',
      }}
    >
      <Button>Mecha Type</Button>
      <Button variant="outline">Mecha Type</Button>
      <li>
        helloNoArgs ({helloNoArgs.status}): <pre>{JSON.stringify(helloNoArgs.data, null, 2)}</pre>
      </li>
      {JSON.stringify(session, null, 2)}
      {session?.user?.image && <Image src={session?.user?.image} width={200} height={200} layout="responsive" />}
      <ReactQueryDevtools initialIsOpen={false} />
    </Layout>
  );
};

export default Home;

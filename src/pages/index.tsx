import { trpc } from '@lib/trpc';

import Button from '@modules/ui/components/button/button';
import React from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { useThemeContext } from '@modules/theme/context/theme-context';
import Layout from '@modules/layouts/core/components/layout';
import { usePreferencesContext } from '@modules/preferences/context/preferences-context';

const Home: React.FC = ({}) => {
  const user = trpc.users.user.useQuery({ username: 'Retrosen' });
  const { theme, change } = useThemeContext();
  const { data: session } = useSession();
  const { dispatch } = usePreferencesContext();

  return (
    <Layout
      headProps={{
        title: 'Home | Mecha Type',
      }}
    >
      <Button
        onClick={() => {
          dispatch({ type: 'SET_ACCENT_COLORS', payload: 'kaki' });
        }}
      >
        TESTING
      </Button>
      Current theme {theme}
      <Button onClick={() => change('dark')}>Dark</Button>
      <Button onClick={() => change('light')}>Light</Button>
      <li>
        helloNoArgs ({user.status}): <pre>{JSON.stringify(user.data, null, 2)}</pre>
      </li>
      {JSON.stringify(session, null, 2)}
      {session?.user?.image && <Image src={session?.user?.image} width={300} height={300} />}
    </Layout>
  );
};

export default Home;

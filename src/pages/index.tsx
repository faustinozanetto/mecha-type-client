import { trpc } from '@lib/trpc';
import Layout from '@modules/layouts/core/components/layout';
import { useThemeContext } from '@modules/theme/context/theme-context';
import Button from '@modules/ui/components/button/button';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import React from 'react';

const Home: React.FC = ({}) => {
  const user = trpc.users.user.useQuery({ username: 'Retrosen' });
  const { theme, change } = useThemeContext();
  const { data: session } = useSession();

  return (
    <Layout
      headProps={{
        title: 'Home | Mecha Type',
      }}
    >
      {JSON.stringify(session)}
      Current theme {theme}
      <Button onClick={() => change('dark')}>Dark</Button>
      <Button onClick={() => change('light')}>Light</Button>
      <li>
        helloNoArgs ({user.status}): <pre>{JSON.stringify(user.data, null, 2)}</pre>
      </li>
      {session?.user?.image && <Image src={session?.user?.image} alt="test" width={300} height={300} />}
      <div className="rounded-xl bg-accent p-4">Accent</div>
      <div className="rounded-xl bg-accent-alt p-4">Accent Alt</div>
      <div className="rounded-xl bg-background p-4">Background</div>
      <div className="rounded-xl bg-caret p-4">Caret</div>
      <div className="rounded-xl bg-text p-4">Text</div>
      <div className="rounded-xl bg-letter p-4">Letter</div>
      <div className="rounded-xl bg-letter-correct p-4">Letter Correct</div>
      <div className="rounded-xl bg-letter-wrong p-4">Letter Wrong</div>
    </Layout>
  );
};

export default Home;

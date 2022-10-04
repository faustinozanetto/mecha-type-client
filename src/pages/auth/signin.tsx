import Layout from '@modules/layouts/components/layout';
import Button from '@modules/ui/components/button/button';
import { signIn } from 'next-auth/react';
import React from 'react';

const SignInPage: React.FC = ({}) => {
  return (
    <Layout
      headProps={{
        title: 'Sign In | Mecha Type',
      }}
    >
      <Button onClick={() => signIn('discord')}>Sign In Now</Button>
    </Layout>
  );
};

export default SignInPage;

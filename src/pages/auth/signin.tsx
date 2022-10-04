import Layout from '@modules/layouts/components/layout';
import Button from '@modules/ui/components/button/button';
import React from 'react';

const SignInPage: React.FC = ({}) => {
  return (
    <Layout
      headProps={{
        title: 'Sign In | Mecha Type',
      }}
    >
      <Button>Sign In Now</Button>
    </Layout>
  );
};

export default SignInPage;

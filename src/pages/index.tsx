import Layout from '@modules/layouts/components/layout';
import Button from '@modules/ui/components/button/button';
import React from 'react';

const Home: React.FC = ({}) => {
  return (
    <Layout
      headProps={{
        title: 'Home | Mecha Type',
      }}
    >
      <Button>Mecha Type</Button>
      <Button variant="outline">Mecha Type</Button>
    </Layout>
  );
};

export default Home;

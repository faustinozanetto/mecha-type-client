import Layout from '@modules/layouts/core/components/layout';
import Button from '@modules/ui/components/button/button';
import Link from 'next/link';
import React from 'react';

const NotFoundPage: React.FC = ({}) => {
  return (
    <Layout
      headProps={{
        title: '404 | Mecha Type',
      }}
    >
      <div className="mb-4 flex w-full flex-col justify-center rounded-lg bg-white p-4 text-center">
        <h2 className="text-3xl font-black text-black">404</h2>
        <p className="mb-4 text-lg font-medium text-black">
          The page your requested does not seem to exist. If you think this may not be correct, please contact us.
        </p>
        <div className="flex items-center justify-center">
          <Link href="/" passHref>
            <Button size="md">Go home</Button>
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default NotFoundPage;

import Layout from '@modules/layouts/core/components/layout';
import {GetServerSideProps} from 'next/types';
import React from 'react'
import {getSession} from 'next-auth/react';
import {Session} from 'next-auth';

interface IDashboardProps {
  session: Session | null;
}

const Dashboard: React.FC<IDashboardProps> = (props) => {
  const {session} = props;

  return (
    <Layout
      headProps={{
        title: 'Dashboard | Mecha Type',
      }}
    >
      Welcome back, {session?.user?.name}. Have a nice {new Date().toLocaleString("en", { weekday: "long" })}
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: {
      session,
    },
  }
}

export default Dashboard;

import { trpc } from '@lib/trpc';
import Layout from '@modules/layouts/core/components/layout';

import UserProfile from '@modules/profile/components/user-profile';
import { useRouter } from 'next/router';
import React from 'react';

const UserProfilePage: React.FC = ({}) => {
  const router = useRouter();
  const user = trpc.users.user.useQuery(
    { username: router.query.username as string },
    { retry: router.query.username !== undefined }
  );
  return (
    <Layout
      headProps={{
        title: 'User Profile | Mecha Type',
      }}
    >
      {user.isLoading && <h1>Loading...</h1>}
      {user.isFetched && user.data && <UserProfile user={user.data} />}
    </Layout>
  );
};

export default UserProfilePage;

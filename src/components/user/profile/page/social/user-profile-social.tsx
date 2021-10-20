import React from 'react';
import { Box, Text } from '@chakra-ui/layout';
import { UserFollowerFragment } from '@generated/graphql';
import { useTranslation } from 'next-i18next';
import { useColorModeValue } from '@chakra-ui/react';
import UserFollowers from './followers/user-followers';

interface UserProfileSocialProps {
  /** Followers data to retrieve data from */
  followersData: UserFollowerFragment[];
  /** Wether content is loading or not */
  loading: boolean;
}

const UserProfileSocial: React.FC<UserProfileSocialProps> = ({ followersData, loading }) => {
  const { t } = useTranslation('user-profile');

  return (
    <Box marginTop="0.5rem" marginBottom="0.5rem">
      <Text as="h2" fontSize="3xl" color={useColorModeValue('black', 'white')} fontWeight={600} marginBottom={4}>
        {t('social-title')}
      </Text>
      <UserFollowers followers={followersData} loading={loading} />
    </Box>
  );
};

export default UserProfileSocial;

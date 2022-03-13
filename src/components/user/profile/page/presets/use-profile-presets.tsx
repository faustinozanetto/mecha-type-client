import React from 'react';
import { Box, Text } from '@chakra-ui/layout';
import { useColorModeValue } from '@chakra-ui/react';
import { User } from '@generated/graphql';
import { useTranslation } from 'next-i18next';
import { UserPresets } from './user-presets';

interface UserProfilePresetsProps {
  /** Wether the current logged in user owns the user page or not */
  ownsPage: boolean;
  user: User;
  /** Wether content is loading or not */
  loading: boolean;
}
const UserProfilePresets: React.FC<UserProfilePresetsProps> = ({ user, ownsPage, loading }) => {
  const { t } = useTranslation('user-profile');
  return (
    <Box marginTop="0.5rem" marginBottom="0.5rem">
      <Text as="h2" fontSize="3xl" color={useColorModeValue('black', 'white')} fontWeight={600} marginBottom={4}>
        {t('presets-title')}
      </Text>
      <UserPresets user={user} ownsPage={ownsPage} loading={loading} />
    </Box>
  );
};

export default UserProfilePresets;

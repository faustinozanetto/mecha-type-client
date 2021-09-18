import React from 'react';
import { Box, Text } from '@chakra-ui/layout';
import { useColorModeValue } from '@chakra-ui/react';
import { TestPreset } from '@generated/graphql';
import { useTranslation } from 'next-i18next';
import { UserPresets } from './user-presets';

interface UserProfilePresetsProps {
  /** Presets data to retrieve data from */
  presets: TestPreset[];
  /** Wether content is loading or not */
  loading: boolean;
}
const UserProfilePresets: React.FC<UserProfilePresetsProps> = ({ presets, loading }) => {
  const { t } = useTranslation('user-profile');
  return (
    <Box marginTop="0.5rem" marginBottom="0.5rem">
      <Text as="h2" fontSize="3xl" color={useColorModeValue('black', 'white')} fontWeight={600} marginBottom={4}>
        {t('presets-title')}
      </Text>
      <UserPresets presets={presets} loading={loading} />
    </Box>
  );
};

export default UserProfilePresets;

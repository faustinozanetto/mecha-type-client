import React from 'react';
import { UserPresetCard } from './user-preset-card';
import { TestPresetFragment } from '@generated/graphql';
import { useTranslation } from 'next-i18next';
import { Flex, Text, VStack, useColorModeValue, Skeleton } from '@chakra-ui/react';

interface UserPresetsProps {
  /** Presets to retrieve data from */
  presets: TestPresetFragment[];
  /** Wether content is loading or not */
  loading: boolean;
}

export const UserPresets: React.FC<UserPresetsProps> = ({ presets, loading }) => {
  const { t } = useTranslation('user-profile');
  const textColor = useColorModeValue('black', 'white');

  return (
    <Flex
      flexDir="column"
      padding="0.5rem"
      borderRadius="lg"
      backgroundColor={useColorModeValue('gray.300', 'gray.700')}
      justifyContent="center"
      alignItems="center"
    >
      <Text as="h2" fontSize="2xl" color={textColor} fontWeight={600} marginTop={2} marginBottom={2}>
        {t('presets-subtitle')}
      </Text>

      {presets && presets.length === 0 && (
        <Skeleton isLoaded={!loading} height="auto">
          <Text as="h3" fontSize="xl" color={textColor} fontWeight={500} marginTop={2} marginBottom={2}>
            {t('no-presets')}
          </Text>
        </Skeleton>
      )}

      {presets && presets.length > 0 && (
        <VStack spacing="0.5rem" px={4} marginBottom="1rem" width="100%">
          {presets.map((preset, index) => {
            if (preset && preset.type) {
              return <UserPresetCard key={preset.type + index} preset={preset} loading={loading} />;
            }
          })}
        </VStack>
      )}
    </Flex>
  );
};

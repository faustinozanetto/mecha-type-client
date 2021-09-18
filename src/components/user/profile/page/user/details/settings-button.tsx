import React from 'react';
import FiSettings from '@meronex/icons/fi/FiSettings';
import { useTranslation } from 'next-i18next';
import { Button } from '@chakra-ui/react';

interface SettingsButtonProps {
  /** Wether content is loading or not */
  loading: boolean;
  onClick: () => void;
}

export const SettingsButton: React.FC<SettingsButtonProps> = ({ loading, onClick }) => {
  const { t } = useTranslation('user-profile');
  return (
    <Button
      colorScheme="blue"
      variant="solid"
      size="lg"
      fontSize="lg"
      borderRadius="lg"
      width={['100%', '100%', '100%']}
      minWidth="3rem"
      leftIcon={<FiSettings />}
      isLoading={loading}
      loadingText="Loading"
      onClick={onClick}
    >
      {t('user-settings')}
    </Button>
  );
};

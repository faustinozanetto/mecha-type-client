import React from 'react';
import FiSettings from '@meronex/icons/fi/FiSettings';
import { useTranslation } from 'next-i18next';
import { Button } from '@chakra-ui/react';
import { useRouter } from 'next/router';

interface SettingsButtonProps {
  /** Wether content is loading or not */
  loading: boolean;
}

export const SettingsButton: React.FC<SettingsButtonProps> = ({ loading }) => {
  const { query } = useRouter();
  const { t } = useTranslation('user-profile');
  return (
    <Button
      as="a"
      href={`/user/${query.name}/edit`}
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
    >
      {t('user-settings')}
    </Button>
  );
};

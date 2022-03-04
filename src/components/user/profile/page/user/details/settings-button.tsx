import React from 'react';
import FiSettings from '@meronex/icons/fi/FiSettings';
import { useTranslation } from 'next-i18next';
import { Button, useColorModeValue } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import Link from 'next/link';

interface SettingsButtonProps {
  /** Wether content is loading or not */
  loading: boolean;
}

export const SettingsButton: React.FC<SettingsButtonProps> = ({ loading }) => {
  const { query } = useRouter();
  const { t } = useTranslation('user-profile');
  return (
    <Link href={`/user/${query.name}/edit`} passHref>
      <Button
        colorScheme="telegram"
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
    </Link>
  );
};

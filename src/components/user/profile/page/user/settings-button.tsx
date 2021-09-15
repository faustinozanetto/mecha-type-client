import React from 'react';
import { FiSettings } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { User } from 'generated/graphql';
import { useTranslation } from 'next-i18next';
import { Button } from '@chakra-ui/react';

interface SettingsButtonProps {
  /** Target user to edit profile */
  user: User;
  onClick: () => void;
}

export const SettingsButton: React.FC<SettingsButtonProps> = ({ user, onClick }) => {
  const router = useRouter();
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
      onClick={onClick}
    >
      {t('user-settings')}
    </Button>
  );
};

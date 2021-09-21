import React from 'react';
import BilGoogle from '@meronex/icons/bi/BilGoogle';
import BilDiscord from '@meronex/icons/bi/BilDiscord';
import BilGithub from '@meronex/icons/bi/BilGithub';
import { Button } from '@chakra-ui/react';
import { ProviderType } from '@pages/auth/signin';
import { useRouter } from 'next/router';
import { __URI__ } from '@utils/constants';

interface SignInOptionProps {
  /** Data of the sign in provider. */
  provider: ProviderType;
}

export const SignInOption: React.FC<SignInOptionProps> = ({ provider }) => {
  const router = useRouter();

  /**
   *
   * @returns the corresponding icon to the provider type.
   */
  const getProviderIcon = (): JSX.Element => {
    switch (provider.id) {
      case 'google': {
        return <BilGoogle />;
      }
      case 'github': {
        return <BilGithub />;
      }
      case 'discord': {
        return <BilDiscord />;
      }
    }
    return <BilGoogle />;
  };

  /**
   *
   * @param provider provider to get data from.
   * @returns the corresponding sign in method to the provider type,
   * with the callback uri.
   */
  const getProviderSignIn = (provider: ProviderType): string => {
    return provider.authUrl;
  };

  return (
    <Button
      as="a"
      variant="outline"
      size="lg"
      rounded="lg"
      height="3.25rem"
      fontSize="1.25rem"
      width="90%"
      colorScheme="messenger"
      leftIcon={getProviderIcon()}
      href={getProviderSignIn(provider)}
    >
      {provider.name}
    </Button>
  );
};

import React from 'react';
import { HStack, Text, Image, SkeletonText, useColorModeValue } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import { CountryEntry } from '@typings/user.types';

interface UserProfileCountryProps {
  /** Country data with name and flag url */
  countryData: CountryEntry;
  /** Wether content is loading or not */
  loading: boolean;
}

export const UserProfileCountry: React.FC<UserProfileCountryProps> = ({ countryData, loading }) => {
  const { t } = useTranslation('user-profile');
  return (
    <SkeletonText isLoaded={!loading} noOfLines={1} py={!loading ? 0 : 2}>
      <HStack align="center" alignItems="center" justify="flex-start">
        {countryData.flag && <Image src={countryData.flag} alt="Country flag" width={8} height={6} borderRadius="md" />}
        <Text as="p" fontSize="xl" color={useColorModeValue('black', 'white')} fontWeight={500}>
          {countryData.name ? countryData.name : t('no-user-country')}
        </Text>
      </HStack>
    </SkeletonText>
  );
};

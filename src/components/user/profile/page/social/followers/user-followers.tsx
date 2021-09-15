import React from 'react';
import { UserFollowerCard } from './user-follower-card';
import { Flex, Text } from '@chakra-ui/layout';
import { Skeleton, useColorModeValue, VStack } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import { User } from '@generated/graphql';

interface UserFollowersProps {
  /** User followers data */
  followers: User[];
  /** Wether content is loading or not */
  loading: boolean;
}

export const UserFollowers: React.FC<UserFollowersProps> = ({ followers, loading }) => {
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
        {t('followers-title')}
      </Text>

      {followers && followers.length === 0 && (
        <Skeleton isLoaded={!loading} height="auto">
          <Text as="h3" fontSize="xl" color={textColor} fontWeight={500} marginTop={2} marginBottom={2}>
            {t('no-followers')}
          </Text>
        </Skeleton>
      )}

      {followers && followers.length > 0 && (
        <VStack spacing="0.5rem" px={4} marginBottom="1rem" width="100%">
          {followers.map((follower) => {
            return <UserFollowerCard key={follower.id} follower={follower} loading={loading}/>;
          })}
        </VStack>
      )}
    </Flex>
  );
};

import React from 'react';
import { UserFollowerCard } from './user-follower-card';
import { Flex, Text } from '@chakra-ui/layout';
import { Skeleton, useColorModeValue, VStack } from '@chakra-ui/react';
import { useTranslation } from 'next-i18next';
import { UserFollowerFragment } from '@generated/graphql';
import { motion } from 'framer-motion';

interface UserFollowersProps {
  /** User followers data */
  followers: UserFollowerFragment[];
  /** Wether content is loading or not */
  loading: boolean;
}

const UserFollowers: React.FC<UserFollowersProps> = ({ followers, loading }) => {
  const { t } = useTranslation('user-profile');
  const textColor = useColorModeValue('black', 'white');
  return (
    <Flex
      flexDir="column"
      padding="0.5rem"
      borderRadius="lg"
      bg={useColorModeValue('gray.100', 'gray.700')}
      color={useColorModeValue('gray.700', 'gray.200')}
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
        <VStack spacing="0.5rem" width="100%">
          {followers.map((follower, index) => {
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, translateY: -25 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ duration: 0.3, delay: index * 0.15 }}
                style={{ width: '100%' }}
              >
                <UserFollowerCard key={follower.id} follower={follower} loading={loading} />
              </motion.div>
            );
          })}
        </VStack>
      )}
    </Flex>
  );
};

export default UserFollowers;

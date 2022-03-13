import React, { useEffect, useState } from 'react';
import { UserPresetCard } from './user-preset-card';
import { TestPresetFragment, User, useUserTestPresetsQuery } from '@generated/graphql';
import { useTranslation } from 'next-i18next';
import { Flex, Text, VStack, useColorModeValue, Skeleton, Button, Box } from '@chakra-ui/react';
import { motion } from 'framer-motion';

interface UserPresetsProps {
  /** Wether the current logged in user owns the user page or not */
  ownsPage: boolean;
  user: User;
  /** Wether content is loading or not */
  loading: boolean;
}

export const UserPresets: React.FC<UserPresetsProps> = ({ ownsPage, user, loading }) => {
  const { t } = useTranslation('user-profile');
  const textColor = useColorModeValue('black', 'white');
  const [pageCount, setPageCount] = useState(0);
  const [presets, setPresets] = useState<TestPresetFragment[]>([]);

  const {
    data: testPresetsData,
    loading: testPresetsLoading,
    fetchMore: testPresetsFetchMore,
    variables: testPresetsVariables,
  } = useUserTestPresetsQuery({
    variables: {
      input: {
        username: user.username,
        take: 3,
        skip: 0,
      },
    },
  });

  // Update state on fetch change
  useEffect(() => {
    if (testPresetsData && testPresetsData.userTestPresets.edges) {
      const mappedPresets = testPresetsData.userTestPresets.edges.map((edge) => edge.node);
      setPresets(mappedPresets);
    }
  }, [testPresetsData, testPresetsLoading]);

  // Fetch more on page count change
  useEffect(() => {
    if (pageCount > 0) {
      testPresetsFetchMore({
        variables: {
          input: {
            take: testPresetsVariables.input.take,
            skip: 3 * pageCount,
            username: testPresetsVariables.input.username,
          },
        },
      });
    }
  }, [pageCount]);

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
        {t('presets-subtitle')}
      </Text>

      {/* No presets */}
      {presets && presets.length === 0 && (
        <Skeleton isLoaded={!loading} height="auto">
          <Text as="h3" fontSize="xl" color={textColor} fontWeight={500} marginTop={2} marginBottom={2}>
            {t('no-presets')}
          </Text>
        </Skeleton>
      )}

      {/* Presets mapping and rendering */}
      {presets && presets.length > 0 && (
        <VStack spacing="0.5rem" width="100%">
          {presets.map((preset, index) => {
            if (preset && preset.type) {
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, translateY: -25 }}
                  animate={{ opacity: 1, translateY: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.15 }}
                  style={{ width: '100%' }}
                >
                  <UserPresetCard preset={preset} ownsPage={ownsPage} loading={loading} />
                </motion.div>
              );
            }
          })}
        </VStack>
      )}

      {/* Loading more */}
      {testPresetsData && testPresetsData.userTestPresets.pageInfo.hasMore && (
        <Flex width="full" justifyContent="center" my={4}>
          <Button
            colorScheme="linkedin"
            onClick={() => {
              setPageCount(pageCount + 1);
            }}
            loadingText="Loading"
            width="15rem"
            isLoading={testPresetsLoading}
          >
            Load More
          </Button>
        </Flex>
      )}
    </Flex>
  );
};

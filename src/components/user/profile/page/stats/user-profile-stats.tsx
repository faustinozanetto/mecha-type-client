import React, { useEffect, useState } from 'react';
import { Box, SimpleGrid, Text } from '@chakra-ui/layout';
import { useColorModeValue } from '@chakra-ui/react';
import { UserStatCard } from '@components/user/profile/page/stats';
import { UserParsedStats, generateParsedStats } from '@modules/core/user/user';
import BiBullseye from '@meronex/icons/bi/BiBullseye';
import BiCrown from '@meronex/icons/bi/BiCrown';
import FaKeyboard from '@meronex/icons/fa/FaKeyboard';
import GrTest from '@meronex/icons/gr/GrTest';
import { UserFragment } from '@generated/graphql';
import { useTranslation } from 'next-i18next';

interface UserProfileStatsProps {
  /** User data to retrieve data from */
  user: UserFragment;
  parsedStats: UserParsedStats;
  /** Loading state */
  loading: boolean;
}

const UserProfileStats: React.FC<UserProfileStatsProps> = ({ parsedStats, loading }) => {
  const { t } = useTranslation('user-profile');

  return (
    <Box marginTop="0.5rem" marginBottom="0.5rem">
      <Text as="h2" fontSize="3xl" color={useColorModeValue('black', 'white')} fontWeight={600} marginBottom="0.5rem">
        {t('stats-title')}
      </Text>
      <SimpleGrid
        columns={[1, 1, 1, 2, 2]}
        spacing="0.5rem"
        padding="0.5rem"
        borderRadius="lg"
        backgroundColor={useColorModeValue('gray.300', 'gray.700')}
      >
        <UserStatCard
          title={t('stats-rank')}
          amount={'666'}
          loading={loading}
          icon={BiCrown}
          backgroundColor="#D69E2E"
        />
        <UserStatCard
          title={t('stats-keystrokes')}
          amount={parsedStats.keystrokes.toString() ?? 'Loading'}
          loading={loading}
          icon={FaKeyboard}
          backgroundColor="#075985"
        />
        <UserStatCard
          title={t('stats-averageWPM')}
          amount={parsedStats.averageWPM.toString() ?? 'Loading'}
          loading={loading}
          icon={FaKeyboard}
          hasTooltip={true}
          tooltipLabel="Words Per Minute"
          backgroundColor="#1E40AF"
        />
        <UserStatCard
          title={t('stats-averageCPM')}
          amount={parsedStats.averageCPM.toString() ?? 'Loading'}
          loading={loading}
          icon={FaKeyboard}
          hasTooltip={true}
          tooltipLabel="Chars Per Minute"
          backgroundColor="#3730A3"
        />
        <UserStatCard
          title={t('stats-accuracy')}
          amount={parsedStats.averageAccuracy.toString() + ' %' ?? 'Loading'}
          loading={loading}
          icon={BiBullseye}
          backgroundColor="#5B21B6"
        />
        <UserStatCard
          title={t('stats-tests-completed')}
          amount={parsedStats.testsCompleted.toString() ?? 'Loading'}
          loading={loading}
          icon={GrTest}
          backgroundColor="#6B21A8"
        />
      </SimpleGrid>
    </Box>
  );
};

export default UserProfileStats;

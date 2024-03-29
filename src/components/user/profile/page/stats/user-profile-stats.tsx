import React from 'react';
import { Box, SimpleGrid, Text } from '@chakra-ui/layout';
import { useColorModeValue } from '@chakra-ui/react';
import { UserStatCard } from '@components/user/profile/page/stats';
import { UserParsedStats } from '@modules/core/user/user';
import BiBullseye from '@meronex/icons/bi/BiBullseye';
import BiCrown from '@meronex/icons/bi/BiCrown';
import FaKeyboard from '@meronex/icons/fa/FaKeyboard';
import GrTest from '@meronex/icons/gr/GrTest';
import { useTranslation } from 'next-i18next';

interface UserProfileStatsProps {
  parsedStats: UserParsedStats;
  /** Loading state */
  loading: boolean;
}

const UserProfileStats: React.FC<UserProfileStatsProps> = ({ loading, parsedStats }) => {
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
        bg={useColorModeValue('gray.100', 'gray.700')}
        color={useColorModeValue('gray.700', 'gray.200')}
      >
        <UserStatCard
          title={t('stats-rank')}
          amount={'666'}
          loading={loading}
          icon={BiCrown}
          backgroundColor="#2f2cd8"
        />
        <UserStatCard
          title={t('stats-keystrokes')}
          amount={parsedStats.keystrokes ?? 'Loading'}
          loading={loading}
          icon={FaKeyboard}
          backgroundColor="#075985"
        />
        <UserStatCard
          title={t('stats-averageWPM')}
          amount={parsedStats.averageWPM ?? 'Loading'}
          loading={loading}
          icon={FaKeyboard}
          hasTooltip={true}
          tooltipLabel="Words Per Minute"
          backgroundColor="#1E40AF"
        />
        <UserStatCard
          title={t('stats-averageCPM')}
          amount={parsedStats.averageCPM ?? 'Loading'}
          loading={loading}
          icon={FaKeyboard}
          hasTooltip={true}
          tooltipLabel="Chars Per Minute"
          backgroundColor="#3730A3"
        />
        <UserStatCard
          title={t('stats-accuracy')}
          amount={parsedStats.averageAccuracy + ' %' ?? 'Loading'}
          loading={loading}
          icon={BiBullseye}
          backgroundColor="#5B21B6"
        />
        <UserStatCard
          title={t('stats-tests-completed')}
          amount={parsedStats.testsCompleted ?? 'Loading'}
          loading={loading}
          icon={GrTest}
          backgroundColor="#6B21A8"
        />
      </SimpleGrid>
    </Box>
  );
};

export default UserProfileStats;

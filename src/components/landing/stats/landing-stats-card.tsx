import { Stat, StatLabel, StatNumber, useColorModeValue } from '@chakra-ui/react';
import React from 'react';

interface LandingStatsCardProps {
  title?: string;
  stat?: number;
}

const LandingStatsCard: React.FC<LandingStatsCardProps> = (props) => {
  const { title, stat } = props;

  return (
    <Stat px={4} py={5} shadow="dark-lg" background={useColorModeValue('gray.100', 'gray.800')} rounded="lg">
      <StatLabel fontWeight={600} fontSize="2xl" color={useColorModeValue('black', 'white')}>
        {title}
      </StatLabel>
      <StatNumber fontSize="2xl" fontWeight={600}>
        {stat}
      </StatNumber>
    </Stat>
  );
};

export default LandingStatsCard;

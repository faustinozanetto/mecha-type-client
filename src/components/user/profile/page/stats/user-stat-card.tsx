import React from 'react';
import { SystemProps, Tooltip } from '@chakra-ui/react';
import { Box, Text, Skeleton, Flex } from '@chakra-ui/react';
import { Icon } from '@chakra-ui/react';
import { motion } from 'framer-motion';

interface UserStatCardProps {
  /** Name to display */
  title?: string;
  /** Amount of the result type */
  amount?: string;
  /** Loading state of the card */
  loading?: boolean;
  /** Icon to add to the left of the card */
  icon: any;
  /** Wether the card should have a tooltip or not */
  hasTooltip?: boolean;
  /** Label to show if tooltip is enabled */
  tooltipLabel?: string;
  /** Background color of the card */
  backgroundColor: SystemProps['backgroundColor'];
}

// TODO: Fix tooltip error when using React-Icons
export const UserStatCard: React.FC<UserStatCardProps> = ({
  title = 'Title',
  amount = '',
  loading = false,
  icon,
  hasTooltip = false,
  tooltipLabel = '',
  backgroundColor,
}) => {
  return (
    <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
      <Tooltip isDisabled={true} label={tooltipLabel} aria-label="Stat Card Tooltip">
        <Box
          display="flex"
          flexDir="row"
          padding="0.75rem"
          margin="0.25rem"
          borderRadius="xl"
          alignItems="center"
          boxShadow="lg"
          backgroundColor={backgroundColor}
        >
          <Icon
            as={icon}
            w={12}
            h={12}
            display="flex"
            padding="0.75rem"
            color="black"
            backgroundColor="white"
            borderRadius="lg"
            alignItems="center"
            justifyContent="center"
          />
          <Flex flexDir="column" ml={4}>
            <Skeleton isLoaded={!loading} height={6} width="6rem">
              <Text as="h3" color="white" fontSize="xl" fontWeight={600}>
                {amount}
              </Text>
            </Skeleton>
            <Skeleton
              isLoaded={!loading}
              height={!loading ? 'auto' : 6}
              width={!loading ? 'auto' : '4rem'}
              mt={!loading ? 1 : 2}
            >
              <Text as="h4" color="white" fontSize="lg" fontWeight={500} wordBreak="break-word">
                {title}
              </Text>
            </Skeleton>
          </Flex>
        </Box>
      </Tooltip>
    </motion.div>
  );
};

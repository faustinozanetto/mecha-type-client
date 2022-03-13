import React from 'react';
import { TestPresetFragment, TestType, useCopyPresetToUserMutation } from 'generated/graphql';
import {
  Button,
  Flex,
  IconButton,
  Skeleton,
  Spacer,
  Text,
  Tooltip,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import FaPlay from '@meronex/icons/fa/FaPlay';
import { CopyIcon } from '@chakra-ui/icons';
import Link from 'next/link';
import useAuth from '@contexts/UserContext';
import UserPresetCardTry from './user-preset-card-try';

interface UserPresetCardProps {
  /** Preset data to retrieve info from. */
  preset: TestPresetFragment;
  /** Wether the current logged in user owns the user page or not */
  ownsPage: boolean;
  /** Wether content is loading or not */
  loading: boolean;
}

export const UserPresetCard: React.FC<UserPresetCardProps> = ({ preset, ownsPage, loading }) => {
  const toast = useToast();
  const { user } = useAuth();
  const [copyPresetToUser] = useCopyPresetToUserMutation();
  return (
    <Flex
      flexDir="row"
      bg={useColorModeValue('gray.50', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}
      alignContent="flex-start"
      justifyContent="space-between"
      alignItems="center"
      padding={4}
      borderRadius="lg"
      width={['auto', 'auto', 'auto', '100%', '100%']}
    >
      <Skeleton isLoaded={!loading} height="auto">
        <Text as="h3" color={useColorModeValue('black', 'white')} fontWeight={600} fontSize="1.1rem">
          {preset.language} | {preset?.type} | {preset.content} |
          {preset.type === TestType.Words ? ` ${preset.words} words` : `${preset.time} seconds`}
        </Text>
      </Skeleton>
      <Skeleton isLoaded={!loading} marginLeft={4} height="auto"></Skeleton>
      <Spacer />

      {/* Copy Button */}
      {user && user.username && (
        <Tooltip label="Copy" aria-label="Copy Preset" fontSize="md">
          <IconButton
            colorScheme="green"
            aria-label="Copy Preset"
            icon={<CopyIcon />}
            m={2}
            onClick={async () => {
              const response = await copyPresetToUser({
                variables: {
                  input: {
                    presetId: preset.id,
                    user: { username: user.username },
                  },
                },
              });
              if (response?.data?.copyPresetToUser?.testPreset) {
                toast({
                  title: 'Success',
                  description: 'Preset copied and saved to your account successfully!',
                  duration: 3000,
                  status: 'success',
                  position: 'bottom-right',
                });
              }
            }}
          />
        </Tooltip>
      )}
      {/* Try Button */}
      <Link href={{ pathname: '/practice/play/[id]', query: { id: preset.id } }} passHref>
        <UserPresetCardTry aria-label="Try Preset" />
      </Link>
    </Flex>
  );
};

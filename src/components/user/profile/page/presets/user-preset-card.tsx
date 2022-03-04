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

interface UserPresetCardProps {
  /** Preset data to retrieve info from. */
  preset: TestPresetFragment;
  /** Wether the current logged in user owns the user page or not */
  ownsPage: boolean;
  loggedInUsername: string;
  /** Wether content is loading or not */
  loading: boolean;
}

export const UserPresetCard: React.FC<UserPresetCardProps> = ({ preset, loggedInUsername, ownsPage, loading }) => {
  const toast = useToast();
  const [copyPresetToUser] = useCopyPresetToUserMutation();
  return (
    <Flex
      flexDir="row"
      backgroundColor={useColorModeValue('gray.400', 'gray.800')}
      alignContent="flex-start"
      justifyContent="space-between"
      alignItems="center"
      padding={4}
      borderRadius="lg"
      width={['auto', 'auto', 'auto', '100%', '100%']}
    >
      <Skeleton isLoaded={!loading} height="auto">
        <Text as="h3" color={useColorModeValue('black', 'white')} fontWeight={600} fontSize="1.1rem">
          {preset.language} | {preset?.type} |{' '}
          {preset.type === TestType.Words ? `${preset.words} words` : `${preset.time} seconds`}
        </Text>
      </Skeleton>
      <Skeleton isLoaded={!loading} marginLeft={4} height="auto"></Skeleton>
      <Spacer />

      {/* Copy Button */}
      {!ownsPage && (
        <Tooltip label="Copy" fontSize="md">
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
                    user: { username: loggedInUsername },
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
      <Tooltip label="Try" fontSize="md">
        <Link href={`/practice/play/${preset.id}`} passHref>
          <IconButton colorScheme="purple" aria-label="Try Preset" icon={<FaPlay />} m={2} />
        </Link>
      </Tooltip>
    </Flex>
  );
};

import React from 'react';
import { PresetCreationForm } from './preset-creation-form';
import { UserFragment } from '@generated/graphql';
import { Text, Flex, useColorModeValue } from '@chakra-ui/react';
import useSession from '@hooks/user/useSession';

interface PresetCreationProps {
  /** Current logged in user. */
  user: UserFragment;
  /** Method to call when the preset was created */
  onCreatedCallback: () => void;
}

const PresetCreation: React.FC<PresetCreationProps> = ({ user, onCreatedCallback }) => {
  const topBg = useColorModeValue('gray.300', 'gray.700');
  const { data, loading } = useSession();

  if (user?.id !== data?.id) {
    return <Text as="h2">UN AUTHORIZED</Text>;
  }
  return (
    <Flex
      padding="1rem"
      borderRadius="2xl"
      boxShadow="xl"
      justifyContent="space-between"
      width="sm"
      backgroundColor={topBg}
    >
      <PresetCreationForm user={user} onCreatedCallback={onCreatedCallback} />
    </Flex>
  );
};
export default PresetCreation;

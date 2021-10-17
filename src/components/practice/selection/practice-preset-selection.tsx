import React, { useEffect, useState } from 'react';
import { TestPresetFragment, UserFragment } from 'generated/graphql';
import { Flex, Container, Text, SimpleGrid, useColorModeValue, Button } from '@chakra-ui/react';
import PresetCreation from './preset-creation/preset-creation';
import PracticePresetCard from './preset-card/practice-preset-card';
import { PracticeSearchInput } from './search-input/practice-search-input';
import useMechaStore from 'state/store';
interface PracticePresetSelectionProps {
  /** Current logged in user. */
  user: UserFragment;
}

export const PracticePresetSelection: React.FC<PracticePresetSelectionProps> = ({ user }) => {
  const bgColor = useColorModeValue('gray.300', 'gray.900');
  const [creatingPreset, setCreatingPreset] = useState(false);
  const { searchedTestPresets } = useMechaStore();
  const [presets, setPresets] = useState<TestPresetFragment[]>([]);

  useEffect(() => {
    setPresets(searchedTestPresets);
  }, [searchedTestPresets]);

  if (creatingPreset) {
    return (
      <PresetCreation
        user={user}
        onCreatedCallback={() => {
          setCreatingPreset(false);
        }}
      />
    );
  }

  return (
    <Flex flexDir="column" justifyContent="center" alignItems="center">
      <Container
        display="flex"
        flexDir="column"
        rounded="lg"
        alignItems="center"
        backgroundColor={bgColor}
        maxWidth="3xl"
        m={4}
        p={4}
      >
        <Text as="h1" fontWeight={600} fontSize="3xl">
          Welcome to Practice!
        </Text>
        <Text as="h2" fontWeight={500} fontSize="lg">
          Here you can choose a preset or create your own custom one.
        </Text>
      </Container>
      <PracticeSearchInput />
      {/* Presets */}
      {presets.length > 0 && (
        <SimpleGrid backgroundColor={bgColor} rounded="2rem" width="3xl" columns={[3]} m={4} p={4}>
          {presets.map((preset, index) => {
            return <PracticePresetCard key={index} presetData={preset} />;
          })}
        </SimpleGrid>
      )}
      {presets.length === 0 && (
        <Flex
          flexDir="column"
          rounded="lg"
          alignContent="center"
          alignItems="center"
          backgroundColor={bgColor}
          m={4}
          p={4}
        >
          <Text as="h2" fontWeight={600} fontSize="xl">
            No presets were found, come again later.
          </Text>
        </Flex>
      )}

      {/* Preset creation */}
      <Container
        display="flex"
        flexDir="column"
        rounded="lg"
        alignItems="center"
        backgroundColor={bgColor}
        maxWidth="3xl"
        m={4}
        p={4}
      >
        <Text as="h2" fontWeight={600} fontSize="3xl">
          What about creating your own?
        </Text>
        <Text as="p" fontWeight={400} fontSize="md" mx={12} textAlign="center">
          If you feel like no preset fits you, you can have a try at creating your own custom preset. You can use it
          later, as it is saved to your profile!.
        </Text>
        <Button
          my={4}
          colorScheme="twitter"
          rounded="xl"
          size="lg"
          onClick={() => {
            setCreatingPreset(true);
          }}
        >
          Start Creating
        </Button>
      </Container>
    </Flex>
  );
};

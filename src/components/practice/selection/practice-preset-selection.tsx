import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { TestPreset, User, useTestPresetsQuery } from 'generated/graphql';
import { PracticePresetCard } from './preset-card/practice-preset-card';
import { PresetCreation } from './preset-creation';
import { Loading } from '@components/loading/loading';
import { GridContainer } from '@components/ui/container/GridContainer';
import { Flex, Container, Text, SimpleGrid, useColorModeValue, Button } from '@chakra-ui/react';

interface PracticePresetSelectionProps {
  /** Current logged in user. */
  user: User;
}

export const PracticePresetSelection: React.FC<PracticePresetSelectionProps> = ({ user }) => {
  const bgColor = useColorModeValue('gray.300', 'gray.900');
  const [creatingPreset, setCreatingPreset] = useState(false);
  const [presets, setPresets] = useState<TestPreset[]>([]);
  const { data: testPresets, loading } = useTestPresetsQuery({
    variables: {
      input: {
        take: 5,
        where: { userId: null },
      },
    },
  });

  useEffect(() => {
    if (!loading && testPresets?.testPresets?.testPresets) {
      const filteredPresets = testPresets.testPresets.testPresets.filter((preset) => preset.userId === null);
      setPresets(filteredPresets);
    }
  }, [loading, testPresets]);

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
        maxWidth="2xl"
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
      {/* Presets */}
      {presets && presets.length > 0 ? (
        <SimpleGrid backgroundColor={bgColor} rounded="2rem" columns={[1, 1, 2, 3, 3]} rows="auto" m={4}>
          {presets.map((preset, index) => {
            return <PracticePresetCard key={index} presetData={preset} />;
          })}
        </SimpleGrid>
      ) : (
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
        maxWidth="2xl"
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

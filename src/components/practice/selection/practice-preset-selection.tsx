import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { TestPreset, User, useTestPresetsQuery } from 'generated/graphql';
import { PracticePresetCard } from './preset-card/practice-preset-card';
import { PresetCreation } from './preset-creation';
import { Loading } from '@components/loading/loading';
import { GridContainer } from '@components/ui/container/GridContainer';
import { Flex, Container, Text, SimpleGrid, useColorModeValue } from '@chakra-ui/react';

interface PracticePresetSelectionProps {
  /** Current logged in user. */
  user: User;
}

export const PracticePresetSelection: React.FC<PracticePresetSelectionProps> = ({ user }) => {
  const bgColor = useColorModeValue('gray.300', 'gray.900');
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
    if (!loading && testPresets?.testPresets) {
      const filteredPresets = testPresets.testPresets.filter((preset) => preset.userId === null);
      setPresets(filteredPresets);
    }
  }, [loading, testPresets]);

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
        <SimpleGrid
          backgroundColor={bgColor}
          rounded="2rem"
          templateColumns={`repeat(${presets.length}, 1fr)`}
          m={4}
          width="max-content"
          alignContent="center"
          justifyContent="center"
        >
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
        <Text as="h2" fontWeight={600} fontSize="2xl">
          What about creating your own?
        </Text>
        <Text as="p" fontWeight={400} fontSize="md" textAlign="center">
          If you feel like no preset fits you, you can have a try at creating your own custom preset. You can use it
          later, as it is saved to your profile!.
        </Text>
      </Container>
      <PresetCreation user={user} />
    </Flex>
  );
};

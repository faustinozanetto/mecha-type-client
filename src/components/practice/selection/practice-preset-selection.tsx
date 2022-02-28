import React, { useEffect, useState } from 'react';
import { TestLanguage, TestPresetWhereInput, User, useTestPresetsQuery } from 'generated/graphql';
import { Flex, Container, Text, SimpleGrid, useColorModeValue, Button, VStack, useToast } from '@chakra-ui/react';
import PracticePresetCard from './preset-card/practice-preset-card';
import { motion } from 'framer-motion';
import { PracticeSearchForm, PracticeSearchValues } from './search-input/practice-search.form';
import { PracticeCreateSection } from './practice-create-section';

interface PracticePresetSelectionProps {}

export const PracticePresetSelection: React.FC<PracticePresetSelectionProps> = ({}) => {
  const bgColor = useColorModeValue('gray.300', 'gray.900');
  const toast = useToast();
  const [pageCount, setPageCount] = useState(0);
  const [searchPresetValues, setSearchPresetValues] = useState<PracticeSearchValues>({
    language: TestLanguage.English,
    filterLanguage: true,
    words: 25,
    filterWords: false,
    punctuated: false,
    filterPunctuated: false,
  });
  const { data, loading, variables, refetch, fetchMore } = useTestPresetsQuery({
    variables: { input: { take: 3, skip: 0, where: { language: TestLanguage.English } } },
    notifyOnNetworkStatusChange: true,
  });

  const parseNewWhereInput = (values: PracticeSearchValues): TestPresetWhereInput => {
    let parsedInput: TestPresetWhereInput = {};
    if (values) {
      if (values.filterLanguage) {
        parsedInput.language = values.language;
      }
      if (values.filterWords) {
        parsedInput.words = values.words;
      }
      if (values.filterPunctuated) {
        parsedInput.punctuated = values.punctuated;
      }
    }
    return parsedInput;
  };

  useEffect(() => {
    refetch({
      input: {
        take: 3,
        skip: pageCount,
        where: parseNewWhereInput(searchPresetValues),
      },
    });
  }, [searchPresetValues]);

  useEffect(() => {
    if (pageCount > 0) {
      fetchMore({
        variables: {
          input: {
            take: variables.input.take,
            skip: 3 * pageCount,
            where: parseNewWhereInput(searchPresetValues),
          },
        },
      });
    }
  }, [pageCount]);

  return (
    <Flex flexDir="column" justifyContent="center" alignItems="center">
      <Container
        display="flex"
        flexDir="column"
        rounded="lg"
        alignItems="center"
        backgroundColor={bgColor}
        maxWidth={['xl', 'xl', '2xl', '3xl']}
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
      <PracticeSearchForm
        onValuesUpdated={async (values) => {
          // Re fetch more using the filtered values and reset current page to 0.
          setPageCount(0);
          setSearchPresetValues(values);
        }}
      />
      {/* Presets */}
      {data && data?.testPresets?.edges?.length > 0 && (
        <VStack backgroundColor={bgColor} rounded="2rem" m={4} p={4}>
          <SimpleGrid maxWidth={['xl', 'xl', '2xl', '3xl']} minChildWidth="220px">
            {data?.testPresets?.edges.map((edge, index) => {
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, translateY: -25 }}
                  animate={{ opacity: 1, translateY: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.15 }}
                >
                  <PracticePresetCard presetData={edge.node} />
                </motion.div>
              );
            })}
          </SimpleGrid>
          {data && data?.testPresets?.pageInfo?.hasMore && (
            <Button
              my={4}
              colorScheme="twitter"
              rounded="xl"
              size="lg"
              onClick={() => {
                // Fetch more and increase current page by one.
                setPageCount(pageCount + 1);
              }}
            >
              Load More
            </Button>
          )}
        </VStack>
      )}
      {/* Presets Loading */}
      {loading && (
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
            Content loading, please wait...
          </Text>
        </Flex>
      )}
      {/* No presets found */}
      {data?.testPresets?.edges.length === 0 && data?.testPresets?.count === 0 && !loading && (
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
            No presets were found, try searching some using the filters from above.
          </Text>
        </Flex>
      )}
      {/* Preset Creation */}
      <PracticeCreateSection />
    </Flex>
  );
};

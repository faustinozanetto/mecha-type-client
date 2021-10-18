import React from 'react';
import * as Yup from 'yup';
import { Formik, FormikProps } from 'formik';
import { TestLanguage, TestPresetWhereInput, useTestPresetsQuery } from '@generated/graphql';
import { useRouter } from 'next/router';
import {
  Flex,
  useToast,
  Text,
  HStack,
  Container,
  useColorModeValue,
  FormControl,
  FormLabel,
  Box,
  Stack,
} from '@chakra-ui/react';
import { FormSubmitButton } from '@components/forms/form-submit-button';
import { FormSelectInput } from '@components/ui/forms/form-select-input';
import { FormNumberInput } from '@components/ui/forms/form-number-input';
import { FormCheckboxInput } from '@components/ui/forms/form-checkbox-input';
import FormSwitchInput from '@components/ui/forms/form-switch-input';
import useMechaStore from 'state/store';
import { parseNumber } from '@modules/core/math/math';

interface PresetCreationFormValues {
  language: TestLanguage;
  filterLanguage: boolean;
  words: number;
  filterWords: boolean;
  punctuated: boolean;
  filterPunctuated: boolean;
}

const validationSchema = Yup.object().shape({
  language: Yup.mixed().oneOf([TestLanguage.English, TestLanguage.Spanish]).required('Please provide a test language'),
  words: Yup.number()
    .min(10, 'The amount of words should be more than 10!')
    .required('Please provide a valid words amount!'),
  punctuated: Yup.boolean().required('Punctuated is required!'),
});

interface PracticeSearchFormProps {}

export const PracticeSearchForm: React.FC<PracticeSearchFormProps> = ({}) => {
  const { fetchMore } = useTestPresetsQuery({
    variables: { input: { currentPage: 0, pageSize: 0, where: {} } },
  });
  const { setSearchedTestPresets, searchedTestPresets } = useMechaStore();
  const filterFieldBG = useColorModeValue('gray.200', 'gray.800');

  const initialFormValues: PresetCreationFormValues = {
    language: TestLanguage.English,
    filterLanguage: false,
    words: 25,
    filterWords: false,
    punctuated: false,
    filterPunctuated: false,
  };
  return (
    <Container
      display="flex"
      flexDir="column"
      rounded="lg"
      alignItems="flex-start"
      backgroundColor={useColorModeValue('gray.300', 'gray.900')}
      maxWidth={['xl', 'xl', '2xl', '3xl']}
      m={4}
      p={4}
    >
      <Formik
        initialValues={initialFormValues}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          let whereInput: TestPresetWhereInput = {};
          if (values.filterLanguage) {
            whereInput.language = values.language;
          }
          if (values.filterWords) {
            whereInput.words = parseNumber(values.words);
          }
          if (values.filterPunctuated) {
            whereInput.punctuated = values.punctuated;
          }
          await fetchMore({
            variables: { input: { currentPage: 0, pageSize: 6, where: whereInput } },
          }).then((data) => {
            setSearchedTestPresets(data.data.testPresets.testPresets);
          });
        }}
      >
        {(props: FormikProps<PresetCreationFormValues>) => {
          const { handleSubmit, values } = props;

          return (
            <Flex as="form" flexDir="column" width="full" onSubmit={handleSubmit as any}>
              <HStack alignItems="center" justifyContent="space-between" mb={2}>
                <Text as="h2" fontWeight={600} fontSize="2xl">
                  Search for Presets
                </Text>
                {/* Submit button */}
                <FormSubmitButton width="20%">Search</FormSubmitButton>
              </HStack>

              {/* Form Content */}
              <Stack direction={['column', 'column', 'row']} alignItems="center">
                {/* Filter Language */}
                <Box backgroundColor={filterFieldBG} width="100%" rounded="xl" p={2} mt={2}>
                  <FormControl id="language" mr={2}>
                    <HStack justifyContent="space-between" mb={values.filterLanguage ? 2 : 0}>
                      <FormLabel margin={0}>Language</FormLabel>
                      <FormSwitchInput name="filterLanguage" />
                    </HStack>
                    {values.filterLanguage && (
                      <FormSelectInput
                        name="language"
                        selectProps={{
                          placeholder: 'Select Language',
                        }}
                      >
                        <option value={TestLanguage.English}>English</option>
                        <option value={TestLanguage.Spanish}>Spanish</option>
                      </FormSelectInput>
                    )}
                  </FormControl>
                </Box>

                {/* Words Amount Input */}
                <Box backgroundColor={filterFieldBG} width="100%" rounded="xl" p={2} marginTop={2}>
                  <FormControl id="words" mr={2}>
                    <HStack justifyContent="space-between" mb={values.filterWords ? 2 : 0}>
                      <FormLabel margin={0}>Words Amount</FormLabel>
                      <FormSwitchInput name="filterWords" switchProps={{ mr: 0 }} />
                    </HStack>
                    {values.filterWords && <FormNumberInput name="words" label="" />}
                  </FormControl>
                </Box>

                {/* Punctuate Input */}
                <Box backgroundColor={filterFieldBG} width="100%" rounded="xl" p={2} mt={2}>
                  <FormControl id="punctuate" mr={2}>
                    <HStack justifyContent="space-between" mb={values.filterPunctuated ? 6 : 0}>
                      <FormLabel margin={0}>Punctuate Words</FormLabel>
                      <FormSwitchInput name="filterPunctuated" />
                    </HStack>
                    {values.filterPunctuated && (
                      <FormCheckboxInput name="punctuated" label="">
                        Punctuate Words
                      </FormCheckboxInput>
                    )}
                  </FormControl>
                </Box>
              </Stack>
            </Flex>
          );
        }}
      </Formik>
    </Container>
  );
};

import React, { useState } from 'react';
import * as Yup from 'yup';
import { Formik, FormikProps } from 'formik';
import { TestLanguage } from '@generated/graphql';
import { Flex, Text, HStack, Container, useColorModeValue, FormControl, FormLabel, Box, Stack } from '@chakra-ui/react';
import { FormSubmitButton } from '@components/forms/form-submit-button';
import { FormSelectInput } from '@components/ui/forms/form-select-input';
import { FormNumberInput } from '@components/ui/forms/form-number-input';
import { FormCheckboxInput } from '@components/ui/forms/form-checkbox-input';
import FormSwitchInput from '@components/ui/forms/form-switch-input';
import { parseNumber } from '@modules/core/math/math';

export interface PracticeSearchValues {
  language: TestLanguage;
  filterLanguage: boolean;
  words: number;
  filterWords: boolean;
  punctuated: boolean;
  filterPunctuated: boolean;
}

interface PracticeSearchFormProps {
  /** Function to call when values are updated. */
  onValuesUpdated: (values: PracticeSearchValues) => void;
}

export const PracticeSearchForm: React.FC<PracticeSearchFormProps> = ({ onValuesUpdated }) => {
  const [formValues, setFormValues] = useState<PracticeSearchValues>();
  const filterFieldBG = useColorModeValue('gray.200', 'gray.800');
  const initialFormValues: PracticeSearchValues = {
    language: TestLanguage.English,
    filterLanguage: true,
    words: 25,
    filterWords: false,
    punctuated: false,
    filterPunctuated: false,
  };

  const validationSchema = Yup.object().shape({
    filterWords: Yup.boolean(),
    language: Yup.mixed()
      .oneOf([TestLanguage.English, TestLanguage.Spanish])
      .required('Please provide a test language'),
    words: Yup.number().when('filterWords', {
      is: true,
      then: Yup.number()
        .min(10, 'The amount of words should be more than 10!')
        .required('Please provide a valid words amount!'),
    }),
    punctuated: Yup.boolean().required('Punctuated is required!'),
  });

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
          console.log(values);
          let parsedValues: PracticeSearchValues = { ...values };
          if (values.filterLanguage) {
            parsedValues.language = values.language;
          }
          if (values.filterWords) {
            if (typeof values.words === 'undefined') {
              parsedValues.words = 25;
            } else {
              parsedValues.words = parseNumber(values.words);
            }
          }
          if (values.filterPunctuated) {
            parsedValues.punctuated = values.punctuated;
          }

          onValuesUpdated(parsedValues);
        }}
      >
        {(props: FormikProps<PracticeSearchValues>) => {
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
                <Box backgroundColor={filterFieldBG} width="100%" rounded="xl" p={2}>
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
                    {values.filterWords && (
                      <FormNumberInput name="words" defaultValue={initialFormValues.words} label="" />
                    )}
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

import React from 'react';
import * as Yup from 'yup';
import { Formik, FormikProps } from 'formik';
import { User } from '@generated/graphql';
import { HStack, Flex, VStack, useToast, Text } from '@chakra-ui/react';
import { CountryEntry } from '@pages/user/[id]';
import { FormSubmitButton } from '@components/forms/form-submit-button';
import { FormCancelButton } from '@components/forms/form-cancel-button';
import { FormCheckboxInput } from '@components/ui/forms/form-checkbox-input';
import { getPracticeConfig, setPracticeConfig } from '@modules/core/practice/practice-config-manager';

interface EditUserPracticeFormProps {
  /** Method to call when data was updated */
  onUpdatedCallback: () => void;
}

export const EditPracticeFormSchema = Yup.object().shape({
  punctuateWords: Yup.boolean().required('Punctuate words is required!'),
  blindMode: Yup.boolean().required('Blind Mode is required!'),
  pauseOnError: Yup.boolean().required('Pause on Error is required!'),
  noBackspace: Yup.boolean().required('No Backspace is required!'),
  typeSounds: Yup.boolean().required('Type Sounds is required!'),
});

export interface EditUserPracticeFormValues {
  punctuateWords: boolean;
  blindMode: boolean;
  pauseOnError: boolean;
  noBackspace: boolean;
  typeSounds: boolean;
}

export const EditUserPracticeForm: React.FC<EditUserPracticeFormProps> = ({ onUpdatedCallback }) => {
  const toast = useToast();
  const initialFormValues: EditUserPracticeFormValues = getPracticeConfig();

  return (
    <Formik
      initialValues={initialFormValues}
      validationSchema={EditPracticeFormSchema}
      onSubmit={async (values) => {
        setPracticeConfig(values);
      }}
    >
      {(props: FormikProps<EditUserPracticeFormValues>) => {
        const { handleSubmit } = props;
        return (
          <Flex as="form" flexDir="column" maxWidth="100%" my={4} px={2} onSubmit={handleSubmit as any}>
            {/* Form Content */}
            <VStack alignItems="flex-start" mb={4}>
              <Text as="h2" fontSize="3xl" fontWeight={600}>
                Practice Settings
              </Text>

              {/* Punctuate Words Input */}
              <VStack>
                <Text as="p" fontSize="md" fontWeight={400}>
                  Wether words should be punctuated or not
                </Text>
                <FormCheckboxInput name="punctuateWords" sx={{ margin: '0.25rem !important' }}>
                  Punctuate Words
                </FormCheckboxInput>
              </VStack>

              {/* Blind Mode Input */}
              <VStack>
                <Text as="p" fontSize="md" fontWeight={400}>
                  Enable or disable all the error colors, and focus on base speed.
                </Text>
                <FormCheckboxInput name="blindMode" sx={{ margin: '0.25rem !important' }}>
                  Blind Mode
                </FormCheckboxInput>
              </VStack>

              {/* Pause on Error Input */}
              <VStack>
                <Text as="p" fontSize="md" fontWeight={400}>
                  Enable or disable pause on error when a character is typed wrong.
                </Text>
                <FormCheckboxInput name="pauseOnError" sx={{ margin: '0.25rem !important' }}>
                  Pause on Error
                </FormCheckboxInput>
              </VStack>

              {/* No Backspace Input */}
              <VStack>
                <Text as="p" fontSize="md" fontWeight={400}>
                  If enabled, user will not be able to delete characters.
                </Text>
                <FormCheckboxInput name="noBackspace" sx={{ margin: '0.25rem !important' }}>
                  No Backspace
                </FormCheckboxInput>
              </VStack>

              {/* Type Sounds Input */}
              <VStack>
                <Text as="p" fontSize="md" fontWeight={400}>
                  If enabled, a keypress sound will be played on key press.
                </Text>
                <FormCheckboxInput name="typeSounds" sx={{ margin: '0.25rem !important' }}>
                  Type Sound
                </FormCheckboxInput>
              </VStack>
            </VStack>
            {/* Submit Form */}
            <HStack>
              {/* Submit button */}
              <FormSubmitButton width="50%">Save Changes</FormSubmitButton>
              <FormCancelButton width="50%" onClick={() => onUpdatedCallback()}>
                Cancel
              </FormCancelButton>
            </HStack>
          </Flex>
        );
      }}
    </Formik>
  );
};

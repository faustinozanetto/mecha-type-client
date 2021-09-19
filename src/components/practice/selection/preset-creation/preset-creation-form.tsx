import React from 'react';
import * as Yup from 'yup';
import { Formik, FormikProps } from 'formik';
import { TestLanguage, TestType, useCreateTestPresetUserMutation, User, UserFragment } from '@generated/graphql';
import { useRouter } from 'next/router';
import { Flex, useToast, Text, VStack, HStack } from '@chakra-ui/react';
import { FormCancelButton } from '@components/forms/form-cancel-button';
import { FormSubmitButton } from '@components/forms/form-submit-button';
import { FormSelectInput } from '@components/ui/forms/form-select-input';
import { FormNumberInput } from '@components/ui/forms/form-number-input';

interface PresetCreationFormValues {
  type: TestType;
  language: TestLanguage;
  words: number;
  time: number;
}

const validationSchema = Yup.object().shape({
  type: Yup.mixed().oneOf([TestType.Time, TestType.Words]).required('Please provide a test type!'),
  language: Yup.mixed().oneOf([TestLanguage.English, TestLanguage.Spanish]).required('Please provide a test language'),
  words: Yup.number()
    .min(10, 'The amount of words should be more than 10!')
    .required('Please provide a valid words amount!'),
  time: Yup.number()
    .min(10, 'The time in seconds should be more than 10!')
    .required('Please provider a valid time in seconds!'),
});

interface PresetCreationFormProps {
  /** Current logged in user. */
  user: UserFragment;
  /** Method to call when the preset was created */
  onCreatedCallback: () => void;
}

export const PresetCreationForm: React.FC<PresetCreationFormProps> = ({ user, onCreatedCallback }) => {
  const router = useRouter();
  const toast = useToast();
  const [createTestPresetUser] = useCreateTestPresetUserMutation();
  const initialFormValues: PresetCreationFormValues = {
    type: TestType.Words,
    language: TestLanguage.English,
    words: 25,
    time: 60,
  };
  return (
    <Formik
      initialValues={initialFormValues}
      validationSchema={validationSchema}
      onSubmit={async (values) => {
        // Making sure the values are numbers and not strings.
        let words = 0;
        if (typeof values.words === 'string') {
          words = Number.parseInt(values.words);
        }

        let time = 0;
        if (typeof values.time === 'string') {
          time = Number.parseInt(values.time);
        }
        // If save preset is true, we save it to the user.
        const response = await createTestPresetUser({
          variables: {
            data: {
              type: values.type,
              words: words,
              time: time,
              language: values.language,
              userId: user.id,
              creatorImage: user.image,
            },
          },
        });
        // Error
        if (response.errors) {
          toast({
            title: 'Something went wrong!',
            description: response.errors[0].message,
            status: 'error',
            position: 'bottom-right',
          });
          return;
        } else if (response.data?.createTestPresetUser) {
          // Success
          toast({
            title: 'Success!',
            description: 'Preset created successfully.',
            status: 'success',
            position: 'bottom-right',
          });
          router.push(`/practice/play/${response.data?.createTestPresetUser?.testPreset?.id}`);
        }
      }}
    >
      {(props: FormikProps<PresetCreationFormValues>) => {
        const { handleSubmit } = props;

        return (
          <Flex as="form" flexDir="column" width="full" my={4} onSubmit={handleSubmit as any}>
            {/* Form Content */}
            <VStack alignItems="center" mb={4}>
              <Text as="h2" fontSize="4xl" fontWeight={700} textAlign="center">
                Preset Creation
              </Text>
              {/* Type input */}
              <FormSelectInput
                name="type"
                label="Test Type"
                selectProps={{
                  placeholder: 'Select Type',
                }}
              >
                <option value={TestType.Time}>Time</option>
                <option value={TestType.Words}>Words</option>
              </FormSelectInput>

              {/* Language input */}
              <FormSelectInput
                name="language"
                label="Test Language"
                selectProps={{
                  placeholder: 'Select Language',
                }}
              >
                <option value={TestLanguage.English}>English</option>
                <option value={TestLanguage.Spanish}>Spanish</option>
              </FormSelectInput>

              {/* Words input */}
              <FormNumberInput name="words" label="Words Amount" />

              {/* Time input */}
              <FormNumberInput name="time" label="Test Time" />
            </VStack>

            {/* Submit Form */}
            <HStack>
              {/* Submit button */}
              <FormSubmitButton width="50%">Submit</FormSubmitButton>
              <FormCancelButton width="50%" onClick={() => onCreatedCallback()}>
                Cancel
              </FormCancelButton>
            </HStack>
          </Flex>
        );
      }}
    </Formik>
  );
};

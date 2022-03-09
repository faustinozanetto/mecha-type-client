import React from 'react';
import * as Yup from 'yup';
import { Formik, FormikProps } from 'formik';
import { TestContent, TestLanguage, TestType, useCreateTestPresetUserMutation, UserFragment } from '@generated/graphql';
import { useRouter } from 'next/router';
import { Flex, useToast, Text, VStack, HStack, Button } from '@chakra-ui/react';
import { FormSubmitButton } from '@components/forms/form-submit-button';
import FormSelectInput from '@components/ui/forms/form-select-input';
import { FormNumberInput } from '@components/ui/forms/form-number-input';
import FormCheckboxInput from '@components/ui/forms/form-checkbox-input';
import useAuth from '@contexts/UserContext';

interface PresetCreationFormValues {
  type: TestType;
  content: TestContent;
  language: TestLanguage;
  words: number;
  time: number;
  punctuated: boolean;
}

const validationSchema = Yup.object().shape({
  type: Yup.mixed().oneOf([TestType.Time, TestType.Words]).required('Please provide a test type!'),
  content: Yup.mixed().oneOf(Object.values(TestContent)).required('Please provide a test content!'),
  language: Yup.mixed().oneOf([TestLanguage.English, TestLanguage.Spanish]).required('Please provide a test language'),
  words: Yup.number()
    .min(10, 'The amount of words should be more than 10!')
    .required('Please provide a valid words amount!'),
  time: Yup.number()
    .min(10, 'The time in seconds should be more than 10!')
    .required('Please provider a valid time in seconds!'),
  punctuated: Yup.boolean().required('Punctuated is required!'),
});

interface PresetCreationFormProps {
  /** Method to call when the preset was created */
  onCreatedCallback: () => void;
}

export const PresetCreationForm: React.FC<PresetCreationFormProps> = ({}) => {
  const router = useRouter();
  const toast = useToast();
  const { user } = useAuth();
  const [createTestPresetUser] = useCreateTestPresetUserMutation();
  const initialFormValues: PresetCreationFormValues = {
    type: TestType.Words,
    language: TestLanguage.English,
    content: TestContent.Random,
    words: 25,
    time: 60,
    punctuated: false,
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
        } else {
          words = values.words;
        }

        let time = 0;
        if (typeof values.time === 'string') {
          time = Number.parseInt(values.time);
        } else {
          time = values.time;
        }

        // If save preset is true, we save it to the user.
        const response = await createTestPresetUser({
          variables: {
            data: {
              type: values.type,
              content: values.content,
              words: words,
              time: time,
              language: values.language,
              punctuated: values.punctuated,
              userId: user.id,
              creatorImage: user.avatar,
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

              {/* Content input */}
              <FormSelectInput name="content" label="Test Content" selectProps={{ placeholder: 'Select Content' }}>
                {Object.values(TestContent).map((content) => (
                  <option key={content} value={content}>
                    {content}
                  </option>
                ))}
              </FormSelectInput>

              {/* Words input */}
              <FormNumberInput name="words" label="Words Amount" />

              {/* Time input */}
              <FormNumberInput name="time" label="Test Time" />

              {/* Punctuate Input */}
              <FormCheckboxInput name="punctuated" label="">
                Punctuate Words
              </FormCheckboxInput>
            </VStack>

            {/* Submit Form */}
            <HStack>
              {/* Submit button */}
              <FormSubmitButton width="50%">Submit</FormSubmitButton>
              <Button as="a" href="/practice" loadingText="Loading" colorScheme="gray" width="50%">
                Cancel
              </Button>
            </HStack>
          </Flex>
        );
      }}
    </Formik>
  );
};

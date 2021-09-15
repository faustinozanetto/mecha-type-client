import React from 'react';
import styled from 'styled-components';
import * as Yup from 'yup';
import { FormInputs } from '@components/forms/user/FormComponents';
import { FormControl, FormLabel, FormError } from '@components/ui/forms';
import { FormInput } from '@components/ui/forms/FormInput';
import { Formik, FormikProps } from 'formik';
import { TestLanguage, TestType, useCreateTestPresetUserMutation, User } from '@generated/graphql';
import { Button } from '@components/ui/buttons';
import { FormSelect } from '@components/ui/forms/FormSelect';
import { useRouter } from 'next/router';
import { useToast } from '@chakra-ui/react';

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #0f172a;
  border-radius: 20px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 1rem;
  margin-bottom: 1rem;
  width: 25rem;
  padding: 1.25rem;

  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
    rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
`;

const TitleContainer = styled.div`
  display: flex;
  align-content: center;
  justify-content: center;
  padding-top: 1rem;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-bottom: 0.25rem;
`;

const Title = styled.h2`
  font-size: 1.75rem;
  font-weight: 700;
  color: #fff;
  text-align: center;
  margin: 0;
`;

interface IFormValues {
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
  user: User;
}

export const PresetCreationForm: React.FC<PresetCreationFormProps> = ({ user }) => {
  const router = useRouter();
  const toast = useToast();
  const [createTestPresetUser] = useCreateTestPresetUserMutation();
  const initialValues: IFormValues = {
    type: TestType.Words,
    language: TestLanguage.English,
    words: 25,
    time: 60,
  };
  return (
    <FormWrapper>
      {/* Title */}
      <TitleContainer>
        <Title>Create your own preset!</Title>
      </TitleContainer>
      {/* Form */}
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, {}) => {
          // If save preset is true, we save it to the user.
          const response = await createTestPresetUser({
            variables: {
              data: {
                type: values.type,
                words: values.words,
                time: values.time,
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
            router.push(`/practice/play/${response.data.createTestPresetUser.id}`);
          }
        }}
      >
        {(props: FormikProps<IFormValues>) => {
          const { isSubmitting, handleSubmit, errors } = props;

          return (
            <form onSubmit={handleSubmit}>
              <FormInputs>
                <FormControl id="type">
                  <FormLabel style={{ color: '#fff', opacity: 1, fontSize: '1.1rem', fontWeight: 600 }}>Type</FormLabel>
                  <FormSelect type="text" name="type">
                    <option>Select option</option>
                    <option value={TestType.Time}>Time</option>
                    <option value={TestType.Words}>Words</option>
                  </FormSelect>
                  <FormError>{errors.type}</FormError>
                </FormControl>

                <FormControl id="language">
                  <FormLabel style={{ color: '#fff', opacity: 1, fontSize: '1.1rem', fontWeight: 600 }}>
                    Language
                  </FormLabel>
                  <FormSelect type="text" name="language">
                    <option>Select option</option>
                    <option value={TestLanguage.English}>English</option>
                    <option value={TestLanguage.Spanish}>Spanish</option>
                  </FormSelect>
                  <FormError>{errors.language}</FormError>
                </FormControl>

                <FormControl id="words">
                  <FormLabel style={{ color: '#fff', opacity: 1, fontSize: '1.1rem', fontWeight: 600 }}>
                    Words Amount
                  </FormLabel>
                  <FormInput type="number" name="words" placeholder={initialValues.words.toString()} />
                  <FormError>{errors.words}</FormError>
                </FormControl>

                <FormControl id="time">
                  <FormLabel style={{ color: '#fff', opacity: 1, fontSize: '1.1rem', fontWeight: 600 }}>
                    Time (s)
                  </FormLabel>
                  <FormInput type="number" name="time" placeholder={initialValues.time.toString()} />
                  <FormError>{errors.time}</FormError>
                </FormControl>
              </FormInputs>

              {/* Submit button */}
              <Button
                backgroundColor="#1D4ED8"
                hoverBackgroundColor="#1E40AF"
                color="#fff"
                hoverColor="#fff"
                borderRadius="md"
                fontSize="1.25rem"
                width="100%"
                height="3.25rem"
                type="submit"
                size="lg"
                margin="1rem 0 1rem 0"
                variant="solid"
                justifyContent="center"
                disabled={isSubmitting}
              >
                Create
              </Button>
            </form>
          );
        }}
      </Formik>
    </FormWrapper>
  );
};

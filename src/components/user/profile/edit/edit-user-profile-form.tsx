import React, { useState } from 'react';
import * as Yup from 'yup';
import router from 'next/router';
import { Formik, FormikProps } from 'formik';
import { UserFragment, useUpdateUserMutation } from '@generated/graphql';
import { HStack, Flex, VStack, useToast, Text, Box } from '@chakra-ui/react';
import { FormTextArea } from '@components/ui/forms/form-text-area';
import FormSelectInput from '@components/ui/forms/form-select-input';
import { FormSubmitButton } from '@components/forms/form-submit-button';
import { FormCancelButton } from '@components/forms/form-cancel-button';
import { CountryEntry } from '@typings/user.types';

interface EditUserProfileFormProps {
  /** User to retrieve data from. */
  user: UserFragment;
  /** Countries data */
  countries: CountryEntry[];
}

export const EditProfileFormSchema = Yup.object().shape({
  country: Yup.string().required('Country is required!'),
  description: Yup.string().required('Description is required!').max(175, 'Max characters allowed are 250!'),
});

export interface EditProfileFormValues {
  country: string;
  description: string;
}

export const EditUserProfileForm: React.FC<EditUserProfileFormProps> = ({ user, countries }) => {
  const [updateUser] = useUpdateUserMutation();
  const toast = useToast();
  const [currentCountry, setCurrentCountry] = useState('');
  const initialFormValues: EditProfileFormValues = {
    country: user?.country ?? '',
    description: user?.description ?? '',
  };

  return (
    <Formik
      initialValues={initialFormValues}
      validationSchema={EditProfileFormSchema}
      onSubmit={async (values) => {
        const response = await updateUser({
          variables: {
            where: {
              id: user.id,
            },
            data: {
              country: values.country,
              description: values.description,
            },
          },
        });
        // An error occurred
        if (response.errors && response.errors.length > 0) {
          toast({
            title: 'An error occurred',
            description: response.errors[0].message,
            status: 'error',
            duration: 3000,
            position: 'bottom-right',
          });
        } else if (response.data?.updateUser.user) {
          toast({
            title: 'Success!',
            description: 'User details have been updated.',
            status: 'success',
            duration: 3000,
            position: 'bottom-right',
          });
          router.push(`/user/${user.username}`);
        }
      }}
    >
      {(props: FormikProps<EditProfileFormValues>) => {
        const { handleSubmit } = props;
        return (
          <Flex as="form" flexDir="column" onSubmit={handleSubmit as any}>
            {/* Form Content */}
            <VStack alignItems="flex-start" spacing={4} mb={4}>
              {/* Title */}
              <Text as="h2" fontSize="4xl" fontWeight={600}>
                Account Settings
              </Text>

              {/* Country Input */}
              <FormSelectInput
                name="country"
                label="User Country"
                onChange={(event) => {
                  // @ts-ignore
                  setCurrentCountry(event.target.value);
                }}
                selectProps={{
                  placeholder: 'Select Country',
                }}
              >
                {countries.length > 0 &&
                  countries.map((country, index) => {
                    return (
                      <option key={index} value={country.name}>
                        {country.name}
                      </option>
                    );
                  })}
              </FormSelectInput>

              {/* Description Input */}
              <FormTextArea name="description" label="User Description" />

              {/* Submit button */}
              <FormSubmitButton width="50%">Save Changes</FormSubmitButton>
            </VStack>
          </Flex>
        );
      }}
    </Formik>
  );
};

import React, { useState } from 'react';
import * as Yup from 'yup';
import { Formik, FormikProps } from 'formik';
import { User, useUpdateUserMutation } from '@generated/graphql';
import { HStack, Flex, VStack, useToast, Text } from '@chakra-ui/react';
import { FormTextArea } from '@components/ui/forms/chakra/form-text-area';
import { EditProfileSubmitButton } from './edit-profile-submit-button';
import { EditProfileCancelButton } from './edit-profile-cancel-button';
import { FormSelectInput } from '@components/ui/forms/chakra/form-select-input';
import { CountryEntry } from '@pages/user/[id]';

interface EditUserProfileFormProps {
  /** User to retrieve data from. */
  user: User;
  /** Method to call when data was updated */
  onUpdatedCallback: () => void;
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

export const EditUserProfileForm: React.FC<EditUserProfileFormProps> = ({ user, onUpdatedCallback, countries }) => {
  const [updateUser] = useUpdateUserMutation();
  const toast = useToast();
  const [currentCountry, setCurrentCountry] = useState('');
  const initialFormValues: EditProfileFormValues = {
    country: user.country,
    description: user.description,
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
          onUpdatedCallback();
        }
      }}
    >
      {(props: FormikProps<EditProfileFormValues>) => {
        const { handleSubmit } = props;
        return (
          <Flex as="form" flexDir="column" maxWidth="100%" my={4} onSubmit={handleSubmit as any}>
            {/* Form Content */}
            <VStack alignItems="flex-start" mb={4}>
              <Text as="h2" fontSize="3xl" fontWeight={600}>
                Account Settings
              </Text>
              {/* Country Input */}
              <HStack display="flex" alignItems="center" justifyContent="center">
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
                {/* {currentCountry && (
                  <Image
                    src={
                      countries.find((country) => {
                        return country.name === currentCountry;
                      })?.flag!
                    }
                    alt="Flag"
                    height={25}
                    width={25}
                  />
                )} */}
              </HStack>

              {/* Description Input */}
              <FormTextArea name="description" label="User Description" />
            </VStack>
            {/* Submit Form */}
            <HStack>
              {/* Submit button */}
              <EditProfileSubmitButton width="50%">Submit</EditProfileSubmitButton>
              <EditProfileCancelButton width="50%" onClick={() => onUpdatedCallback()}>
                Cancel
              </EditProfileCancelButton>
            </HStack>
          </Flex>
        );
      }}
    </Formik>
  );
};

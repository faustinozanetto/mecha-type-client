import React, { useState } from 'react';
import * as Yup from 'yup';
import { Formik, FormikProps } from 'formik';
import { HStack, Flex, VStack, useToast, Text } from '@chakra-ui/react';
import { FormSubmitButton } from '@components/forms/form-submit-button';
import { FormCancelButton } from '@components/forms/form-cancel-button';
import { FormCheckboxInput } from '@components/ui/forms/form-checkbox-input';
import FormSliderInput from '@components/ui/forms/form-slider-input';
import { roundTo2 } from '@modules/core/math/math';
import { useRouter } from 'next/router';
import { UserSettings, useUpdateUserSettingsMutation } from '@generated/graphql';
import { HexColorPicker } from 'react-colorful';
import { FormControl } from '@components/ui/forms/form-control';

interface EditUserPracticeFormProps {
  /** Callback function to call when cancel button is clicked */
  onCancelCallback: () => void;
  userId: string;
  userSettings: UserSettings;
}

export const EditPracticeFormSchema = Yup.object().shape({
  caretColor: Yup.string().required('Caret color is required!'),
  blindMode: Yup.boolean().required('Blind Mode is required!'),
  pauseOnError: Yup.boolean().required('Pause on Error is required!'),
  noBackspace: Yup.boolean().required('No Backspace is required!'),
  typeSounds: Yup.boolean().required('Type Sounds is required!'),
  typeSoundsVolume: Yup.number()
    .min(0.1, 'Volume must be greater than 0.1')
    .max(5, 'Volume must be lower than 5')
    .required('Volume is required'),
});

export interface EditUserPracticeFormValues {
  caretColor: string;
  blindMode: boolean;
  pauseOnError: boolean;
  noBackspace: boolean;
  typeSounds: boolean;
  typeSoundsVolume: number;
}

export const EditUserPracticeForm: React.FC<EditUserPracticeFormProps> = ({
  userSettings,
  userId,
  onCancelCallback,
}) => {
  const toast = useToast();
  const router = useRouter();
  const [color, setColor] = useState(userSettings?.caretColor);
  const [updateUserSettings] = useUpdateUserSettingsMutation();
  const [typeSoundValue, setTypeSoundValue] = useState(userSettings?.typeSoundsVolume);
  const initialFormValues: EditUserPracticeFormValues = {
    caretColor: userSettings?.caretColor,
    blindMode: userSettings?.blindMode,
    noBackspace: userSettings?.noBackspace,
    pauseOnError: userSettings?.pauseOnError,
    typeSounds: userSettings?.typeSounds,
    typeSoundsVolume: userSettings?.typeSoundsVolume,
  };

  return (
    <Formik
      enableReinitialize={true}
      initialValues={initialFormValues}
      validationSchema={EditPracticeFormSchema}
      onSubmit={async (values) => {
        const response = await updateUserSettings({
          variables: { input: { ...values, caretColor: values.caretColor, userId } },
        });
        if (response?.data?.updateUserSettings?.errors?.length > 0) {
          toast({
            title: 'An error occurred',
            description: response.data.updateUserSettings.errors[0].message,
            duration: 3000,
            status: 'error',
            position: 'bottom-right',
          });
        }
        toast({
          title: 'Success',
          description: 'Practice settings saved successfully!',
          duration: 3000,
          status: 'success',
          position: 'bottom-right',
        });
        router.push(`/user/${router.query.name}`);
      }}
    >
      {(props: FormikProps<EditUserPracticeFormValues>) => {
        const { handleSubmit, setValues, values } = props;
        return (
          <Flex as="form" flexDir="column" maxWidth="100%" my={4} px={2} onSubmit={handleSubmit as any}>
            {/* Form Content */}
            <VStack alignItems="flex-start" mb={4}>
              <Text as="h2" fontSize="3xl" fontWeight={600}>
                Practice Settings
              </Text>

              {/* Blind Mode Input */}
              <Flex flexDir="column" width="100%">
                <Text as="p" fontSize="md" fontWeight={500}>
                  Enable or disable all the error colors, and focus on base speed.
                </Text>
                <FormCheckboxInput name="blindMode" sx={{ margin: '0.25rem !important' }}>
                  Blind Mode
                </FormCheckboxInput>
              </Flex>

              {/* Pause on Error Input */}
              <Flex flexDir="column" width="100%">
                <Text as="p" fontSize="md" fontWeight={500}>
                  Enable or disable pause on error when a character is typed wrong.
                </Text>
                <FormCheckboxInput name="pauseOnError" sx={{ margin: '0.25rem !important' }}>
                  Pause on Error
                </FormCheckboxInput>
              </Flex>

              {/* No Backspace Input */}
              <Flex flexDir="column" width="100%">
                <Text as="p" fontSize="md" fontWeight={500}>
                  If enabled, user will not be able to delete characters.
                </Text>
                <FormCheckboxInput name="noBackspace" sx={{ margin: '0.25rem !important' }}>
                  No Backspace
                </FormCheckboxInput>
              </Flex>

              {/* Caret Customization */}
              <Flex flexDir="column" width="100%">
                <Text as="p" fontSize="md" fontWeight={500} mb={2}>
                  Customize the color of the Caret in Practice mode.
                </Text>
                <HStack>
                  <FormControl name="caretColor">
                    <HexColorPicker
                      color={color}
                      onChange={(newColor) => {
                        setColor(newColor);
                        setValues({ ...values, caretColor: newColor });
                      }}
                    />
                  </FormControl>
                  <Text as="span" backgroundColor={color}>
                    {color}
                  </Text>
                </HStack>
              </Flex>

              {/* Type Sounds Input */}
              <Flex flexDir="column" width="100%">
                <Text as="p" fontSize="md" fontWeight={500}>
                  If enabled, a keypress sound will be played on key press.
                </Text>
                <FormCheckboxInput name="typeSounds" sx={{ margin: '0.25rem !important' }}>
                  Type Sound
                </FormCheckboxInput>
              </Flex>

              {/* Type Sounds Volume Input */}
              <Flex flexDir="column" width="100%">
                <Text as="p" fontSize="md" fontWeight={500}>
                  Controls the volume of the type sounds in a scale 0.1 to 5
                </Text>
                <HStack width="100%">
                  <FormSliderInput
                    name="typeSoundsVolume"
                    sliderProps={{
                      min: 0.1,
                      step: 0.0001,
                      max: 5,
                      defaultValue: initialFormValues?.typeSoundsVolume,
                      onChangeStart: (value) => setTypeSoundValue(value),
                    }}
                    sx={{ margin: '0.25rem !important' }}
                  >
                    Type Sound Volume
                  </FormSliderInput>
                  <Text as="p" fontSize="md" fontWeight={500}>
                    {roundTo2(typeSoundValue)}
                  </Text>
                </HStack>
              </Flex>
            </VStack>
            {/* Submit Form */}
            <HStack>
              {/* Submit button */}
              <FormSubmitButton width="50%">Save Changes</FormSubmitButton>
              <FormCancelButton width="50%" onClick={onCancelCallback}>
                Cancel
              </FormCancelButton>
            </HStack>
          </Flex>
        );
      }}
    </Formik>
  );
};

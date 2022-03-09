import React, { useState } from 'react';
import * as Yup from 'yup';
import { Formik, FormikProps } from 'formik';
import { HStack, Flex, VStack, useToast, Text, SliderMark } from '@chakra-ui/react';
import { FormSubmitButton } from '@components/forms/form-submit-button';
import FormCheckboxInput from '@components/ui/forms/form-checkbox-input';
import FormSliderInput from '@components/ui/forms/form-slider-input';
import { roundTo2 } from '@modules/core/math/math';
import { useRouter } from 'next/router';
import { CaretStyle, UserSettings, useUpdateUserSettingsMutation } from '@generated/graphql';
import { HexColorPicker } from 'react-colorful';
import FormControl from '@components/ui/forms/form-control';
import FormSelectInput from '@components/ui/forms/form-select-input';

interface EditUserPracticeFormProps {
  userId: string;
  userSettings: UserSettings;
}

export const EditPracticeFormSchema = Yup.object().shape({
  caretColor: Yup.string().required('Caret color is required!'),
  caretStyle: Yup.mixed().oneOf(Object.values(CaretStyle)),
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
  caretStyle: CaretStyle;
  blindMode: boolean;
  pauseOnError: boolean;
  noBackspace: boolean;
  typeSounds: boolean;
  typeSoundsVolume: number;
}

export const EditUserPracticeForm: React.FC<EditUserPracticeFormProps> = ({ userSettings, userId }) => {
  const toast = useToast();
  const router = useRouter();
  const [color, setColor] = useState(userSettings?.caretColor);
  const [updateUserSettings] = useUpdateUserSettingsMutation();
  const [typeSoundValue, setTypeSoundValue] = useState(userSettings?.typeSoundsVolume);
  const initialFormValues: EditUserPracticeFormValues = {
    caretColor: userSettings?.caretColor,
    caretStyle: userSettings?.caretStyle,
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
          <Flex as="form" flexDir="column" onSubmit={handleSubmit as any}>
            {/* Form Content */}
            <VStack alignItems="flex-start" mb={4}>
              <Text as="h2" fontSize="4xl" fontWeight={600}>
                Practice Settings
              </Text>

              {/* Blind Mode Input */}
              <FormCheckboxInput
                name="blindMode"
                sx={{ margin: '0.25rem !important' }}
                helperText="Enable or disable all the error colors, and focus on base speed."
              >
                Blind Mode
              </FormCheckboxInput>

              {/* Pause on Error Input */}
              <FormCheckboxInput
                name="pauseOnError"
                sx={{ margin: '0.25rem !important' }}
                helperText=" Enable or disable pause on error when a character is typed wrong."
              >
                Pause on Error
              </FormCheckboxInput>

              {/* No Backspace Input */}
              <FormCheckboxInput
                name="noBackspace"
                sx={{ margin: '0.25rem !important' }}
                helperText="  If enabled, user will not be able to delete characters."
              >
                No Backspace
              </FormCheckboxInput>

              {/* Caret Customization */}
              <FormControl name="caretColor" helperText=" Customize the color of the Caret in Practice mode.">
                <HexColorPicker
                  color={color}
                  onChange={(newColor) => {
                    setColor(newColor);
                    setValues({ ...values, caretColor: newColor });
                  }}
                />
              </FormControl>

              {/* Caret style */}
              <FormSelectInput
                name="caretStyle"
                label="Caret Style"
                helperText="Select the style of the Caret in Practice mode."
                selectProps={{
                  placeholder: 'Select Style',
                }}
              >
                {Object.values(CaretStyle).map((style, index) => {
                  return (
                    <option key={index} value={style}>
                      {style}
                    </option>
                  );
                })}
              </FormSelectInput>

              {/* Type Sounds Input */}
              <FormCheckboxInput
                name="typeSounds"
                helperText=" If enabled, a keypress sound will be played on key press."
              >
                Type Sound
              </FormCheckboxInput>

              {/* Type Sounds Volume Input */}
              <FormSliderInput
                name="typeSoundsVolume"
                label="Type Sounds Volume"
                sliderMark={true}
                sliderProps={{
                  min: 0.1,
                  step: 0.0001,
                  max: 5,
                  defaultValue: initialFormValues?.typeSoundsVolume,
                }}
                // @ts-ignore
                onChange={(value) => setTypeSoundValue(value.target.value)}
                helperText="   Controls the volume of the type sounds in a scale 0.1 to 5"
                sx={{ margin: '0.25rem !important' }}
              />
              {/* Submit button */}
              <FormSubmitButton width="50%">Save Changes</FormSubmitButton>
            </VStack>
          </Flex>
        );
      }}
    </Formik>
  );
};

import React, { useState } from 'react';
import {
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderProps,
  SliderThumb,
  SliderThumbProps,
  SliderTrack,
  SliderTrackProps,
} from '@chakra-ui/react';
import FormControl, { BaseFormProps } from './form-control';
import { useField } from 'formik';

export type FormSliderControlProps = BaseFormProps & {
  sliderMark?: boolean;
  sliderProps?: SliderProps;
  sliderTrackProps?: SliderTrackProps;
  sliderThumbProps?: SliderThumbProps;
};

const FormSliderInput: React.FC<FormSliderControlProps> = (props) => {
  const { name, label, sliderMark, sliderProps, sliderTrackProps, sliderThumbProps, ...rest } = props;
  const [field, , { setValue }] = useField(name);
  const [sliderValue, setSliderValue] = useState(0);
  function handleChange(value: number) {
    setValue(value);
    setSliderValue(Number(value.toFixed(2)));
  }
  // Does not behave like expected, so we manually handle it.
  function handleBlur(e: React.FocusEvent<HTMLDivElement>) {
    (e.target as any).name = name;
    field.onBlur(e);
  }

  return (
    <FormControl name={name} label={label} {...rest}>
      <Slider {...field} id={name} onChange={handleChange} onBlur={handleBlur} {...sliderProps}>
        <SliderTrack {...sliderTrackProps}>
          <SliderFilledTrack />
        </SliderTrack>
        {sliderMark && (
          <SliderMark value={sliderValue} textAlign="center" bg="blue.500" color="white" mt="-10" ml="-5" w="12">
            {sliderValue}
          </SliderMark>
        )}
        <SliderThumb {...sliderThumbProps} />
      </Slider>
    </FormControl>
  );
};
export default FormSliderInput;

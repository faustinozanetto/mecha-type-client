import React, { ForwardedRef } from 'react';
import { Input, InputProps } from '@chakra-ui/react';
import FormControl, { BaseFormProps } from './form-control';
import { useField } from 'formik';

export type FormInputProps = BaseFormProps & { inputProps?: InputProps };

const InputControl: React.FC<FormInputProps> = React.forwardRef(
  (props: FormInputProps, ref: ForwardedRef<HTMLInputElement>) => {
    const { name, label, inputProps, ...rest } = props;
    const [field] = useField(name);

    return (
      <FormControl name={name} label={label} {...rest}>
        <Input {...field} id={name} {...inputProps} ref={ref} />
      </FormControl>
    );
  }
);

InputControl.displayName = 'InputControl';

export default InputControl;

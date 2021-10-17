import React, { FC, ForwardedRef } from 'react';
import { Input, InputProps } from '@chakra-ui/react';
import { BaseProps, FormControl } from './form-control';
import { useField } from 'formik';

export type FormInputProps = BaseProps & { inputProps?: InputProps };

export const FormInput: React.FC<FormInputProps> = React.forwardRef(
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

FormInput.displayName = 'FormInput';

import React, { FC, ReactNode } from 'react';
import { Checkbox, CheckboxProps } from '@chakra-ui/react';
import { useField } from 'formik';
import { BaseProps, FormControl } from './form-control';

export type FormCheckboxInputProps = BaseProps & {
  checkBoxProps?: CheckboxProps;
  children: ReactNode;
};

export const FormCheckboxInput: FC<FormCheckboxInputProps> = (props: FormCheckboxInputProps) => {
  const { name, children, checkBoxProps, ...rest } = props;
  const [field, { error, touched }] = useField(name);
  const isChecked = field.value;

  return (
    <FormControl name={name} {...rest}>
      <Checkbox {...field} id={name} isInvalid={!!error && touched} isChecked={isChecked} {...checkBoxProps}>
        {children}
      </Checkbox>
    </FormControl>
  );
};

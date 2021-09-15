import React, { ReactNode } from 'react';
import { Select, SelectProps } from '@chakra-ui/react';
import { BaseProps, FormControl } from './form-control';
import { useField } from 'formik';

export type FormSelectInputProps = BaseProps & { selectProps?: SelectProps; children: ReactNode };

export const FormSelectInput: React.FC<FormSelectInputProps> = (props) => {
  const { name, label, selectProps, children, ...rest } = props;
  const [field] = useField(name);

  return (
    <FormControl name={name} label={label} {...rest}>
      <Select {...field} id={name} {...selectProps}>
        {children}
      </Select>
    </FormControl>
  );
};

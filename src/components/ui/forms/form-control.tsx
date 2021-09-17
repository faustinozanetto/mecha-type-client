import React from 'react';
import {
  FormControl as ChakraFormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  FormControlProps,
} from '@chakra-ui/react';
import { useField } from 'formik';

export interface BaseProps extends FormControlProps {
  name: string;
  label?: string;
  helperText?: string;
}

export const FormControl: React.FC<BaseProps> = (props) => {
  const { children, name, label, helperText, ...rest } = props;
  const [, { error, touched }] = useField(name);

  return (
    <ChakraFormControl isInvalid={!!error && touched} {...rest}>
      {label && <FormLabel htmlFor={name}>{label}</FormLabel>}
      {children}
      {error && <FormErrorMessage>{error}</FormErrorMessage>}
      {helperText && <FormHelperText>{helperText}</FormHelperText>}
    </ChakraFormControl>
  );
};

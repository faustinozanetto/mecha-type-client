import React from 'react';
import {
  FormControl as ChakraFormControl,
  FormErrorMessage,
  FormErrorMessageProps,
  FormHelperText,
  FormLabel,
  FormLabelProps,
} from '@chakra-ui/react';
import { FormControlProps } from '@chakra-ui/react';
import { useField } from 'formik';

export interface BaseFormProps extends FormControlProps {
  name: string;
  label?: string;
  labelProps?: FormLabelProps;
  helperText?: string;
  helperTextProps?: FormErrorMessageProps;
  errorMessageProps?: FormErrorMessageProps;
}

const FormControl: React.FC<BaseFormProps> = (props) => {
  const { children, name, label, helperText, labelProps, helperTextProps, errorMessageProps, ...rest } = props;
  const [, { error, touched }] = useField(name);

  return (
    <ChakraFormControl isInvalid={!!error && touched} {...rest}>
      {/* Label */}
      {label && (
        <FormLabel htmlFor={name} {...labelProps}>
          {label}
        </FormLabel>
      )}
      {/* Children */}
      {children}
      {/* Error */}
      {error && <FormErrorMessage {...errorMessageProps}>{error}</FormErrorMessage>}
      {/* Helper text */}
      {helperText && <FormHelperText {...helperTextProps}>{helperText}</FormHelperText>}
    </ChakraFormControl>
  );
};

export default FormControl;

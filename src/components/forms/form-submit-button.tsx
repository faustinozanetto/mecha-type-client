import React from 'react';
import { Button, ButtonProps } from '@chakra-ui/react';
import { useFormikContext } from 'formik';

export type FormSubmitButtonProps = ButtonProps;

export const FormSubmitButton: React.FC<FormSubmitButtonProps> = (props) => {
  const { children, ...rest } = props;
  const { isSubmitting } = useFormikContext();
  return (
    <Button type="submit" isLoading={isSubmitting} loadingText="Loading" colorScheme="telegram" {...rest}>
      {children}
    </Button>
  );
};

import React from 'react';
import { Button, ButtonProps } from '@chakra-ui/react';
import { useFormikContext } from 'formik';

export type FormCancelButtonProps = ButtonProps;

export const FormCancelButton: React.FC<FormCancelButtonProps> = (props) => {
  const { children, ...rest } = props;
  const { isSubmitting } = useFormikContext();
  return (
    <Button isLoading={isSubmitting} loadingText="Loading" colorScheme="gray" {...rest}>
      {children}
    </Button>
  );
};

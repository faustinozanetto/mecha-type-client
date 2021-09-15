import React from 'react';
import { Button, ButtonProps } from '@chakra-ui/react';
import { useFormikContext } from 'formik';

export type EditProfileSubmitButtonProps = ButtonProps;

export const EditProfileSubmitButton: React.FC<EditProfileSubmitButtonProps> = (props) => {
  const { children, ...rest } = props;
  const { isSubmitting } = useFormikContext();
  return (
    <Button type="submit" isLoading={isSubmitting} loadingText="Loading" colorScheme="green" {...rest}>
      {children}
    </Button>
  );
};

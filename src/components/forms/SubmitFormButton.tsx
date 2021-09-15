import React from 'react';
import { Button, ButtonProps } from '@components/ui/buttons';

interface SubmitFormButtonProps extends ButtonProps {
  label: string;
}

export const SubmitFormButton: React.FC<SubmitFormButtonProps> = ({ label, ...rest }) => {
  return (
    <Button
      backgroundColor="hsl(1, 5%, 17%)"
      hoverBackgroundColor="hsl(1, 3%, 8%)"
      color="#fff"
      hoverColor="#fff"
      borderRadius="md"
      fontSize="1.25rem"
      width="100%"
      height="3.25rem"
      size="lg"
      margin="0"
      variant="solid"
      justifyContent="center"
      {...rest}
    >
      {label}
    </Button>
  );
};

import React from 'react';
import { FormErrorContainer } from './styles';

interface IFormErrorProps {}

export interface FormErrorProps extends React.HTMLAttributes<HTMLDivElement>, IFormErrorProps {}

export const FormError = React.forwardRef<HTMLDivElement, FormErrorProps>((props, ref) => {
  const { children, ...rest } = props;

  return (
    <FormErrorContainer ref={ref} {...rest}>
      {children}
    </FormErrorContainer>
  );
});
FormError.displayName = 'FormError';

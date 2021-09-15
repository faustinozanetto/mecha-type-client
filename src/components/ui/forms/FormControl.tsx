import React from 'react';
import { FormControlWrapper } from './styles';

interface IFormControlProps {}

export interface FormControlProps extends React.HTMLAttributes<HTMLDivElement>, IFormControlProps {}

export const FormControl = React.forwardRef<HTMLDivElement, FormControlProps>((props, ref) => {
  const { children, ...rest } = props;

  return (
    <FormControlWrapper ref={ref} {...rest} role="group">
      {children}
    </FormControlWrapper>
  );
});
FormControl.displayName = 'FormControl';

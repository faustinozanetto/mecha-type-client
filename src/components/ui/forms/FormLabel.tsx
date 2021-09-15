import React from 'react';
import styled from 'styled-components';

const Label = styled.label`
  font-size: 1rem;
  font-weight: 500;
  opacity: 0.8;
`;

interface IFormLabelProps {}

export interface FormLabelProps extends React.HTMLAttributes<HTMLLabelElement>, IFormLabelProps {}

export const FormLabel = React.forwardRef<HTMLLabelElement, FormLabelProps>((props, ref) => {
  const { children, ...rest } = props;

  return (
    <Label ref={ref} {...rest}>
      {children}
    </Label>
  );
});
FormLabel.displayName = 'FormLabel';

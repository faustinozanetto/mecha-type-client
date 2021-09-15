import React from 'react';
import styled from 'styled-components';
import { useField } from 'formik';

const StyledCheckbox = styled.input`
  border: 0px;
  margin-left: 0.5rem;
  padding: 0px;
  overflow: hidden;
  white-space: nowrap;
`;

interface ICheckboxInputProps {}

export interface CheckboxInputProps extends React.InputHTMLAttributes<HTMLInputElement>, ICheckboxInputProps {}

export const CheckboxInput = React.forwardRef<HTMLInputElement, CheckboxInputProps>((props, ref) => {
  const { children, placeholder, ...rest } = props;

  //@ts-ignore
  const [field, { error }] = useField(props);
  return (
    <StyledCheckbox ref={ref} type="checkbox" id={field.name} {...field} {...rest}>
      {children}
    </StyledCheckbox>
  );
});
CheckboxInput.displayName = 'CheckboxInput';

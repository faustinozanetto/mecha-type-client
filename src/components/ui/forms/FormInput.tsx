import React from 'react';
import styled from 'styled-components';
import { useField } from 'formik';

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Input = styled.input`
  background-color: #374151;
  color: #fff;
  height: 2.5rem;
  text-indent: 15px;
  font-size: 14px;
  font-weight: 500;
  transition: all 200ms ease-out;
  cursor: pointer;

  line-height: normal;
  font-size: 1rem;

  border-radius: 0.375rem;
  border-width: 1px;
  border-style: solid;
  border-image: initial;
  border-color: inherit;
  background: inherit;

  margin-top: 0.5rem;
  margin-bottom: 0.5rem;

  &:hover {
    border: 1px solid #fff;
  }

  &:focus {
    border: 1px solid #fff;
    background-color: #374151;
  }
`;

interface IFormInputProps {}

export interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement>, IFormInputProps {}

export const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>((props, ref) => {
  const { children, placeholder, ...rest } = props;
  //@ts-ignore
  const [field, { error }] = useField(props);

  return (
    <InputWrapper>
      <Input ref={ref} placeholder={placeholder} id={field.name} {...field} {...rest}>
        {children}
      </Input>
    </InputWrapper>
  );
});
FormInput.displayName = 'FormInput';

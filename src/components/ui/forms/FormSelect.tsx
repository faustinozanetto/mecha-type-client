import React from 'react';
import styled from 'styled-components';
import { useField } from 'formik';

const SelectWrapper = styled.div`
  width: 100%;
  height: fit-content;
  position: relative;
`;

const Select = styled.select`
  width: 100%;
  min-width: 0px;
  outline: transparent solid 2px;
  color: #fff;
  outline-offset: 2px;
  position: relative;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
  appearance: none;
  transition-property: background-color, border-color, color, fill, stroke, opacity, box-shadow, transform;
  transition-duration: 200ms;
  padding-bottom: 1px;
  line-height: normal;
  font-size: 1rem;
  padding-inline-start: 1rem;
  padding-inline-end: 2rem;
  height: 2.5rem;
  border-radius: 0.375rem;
  border-width: 1px;
  border-style: solid;
  border-image: initial;
  border-color: inherit;
  background: inherit;

  & > option {
    background-color: #1f2937;
    color: #fff;
    font-size: 1rem;
    font-weight: 500;
  }
`;

interface IFormSelectProps {}

export interface FormSelectProps extends React.InputHTMLAttributes<HTMLSelectElement>, IFormSelectProps {}

export const FormSelect = React.forwardRef<HTMLSelectElement, FormSelectProps>((props, ref) => {
  const { children, placeholder, ...rest } = props;
  //@ts-ignore
  const [field, { error }] = useField(props);

  return (
    <SelectWrapper>
      <Select ref={ref} placeholder={placeholder} id={field.name} {...field} {...rest}>
        {children}
      </Select>
    </SelectWrapper>
  );
});
FormSelect.displayName = 'FormSelect';

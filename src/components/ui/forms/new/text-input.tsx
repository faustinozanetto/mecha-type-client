import React from 'react';
import styled from 'styled-components';
import { Field, FieldProps } from 'formik';
import { BaseFormFieldProps, getInputProps } from './formik-utils';
import { FieldWrap } from './form-wrap';

const SText = styled.input`
  display: block;
  width: 100%;
  cursor: text;
  font-weight: 600;
  background: #1c1c1f;
  &:focus {
    border-color: #fff;
  }
  height: 48px;
  outline: none;
  border: none;
  border-radius: none;
  color: #eee;
  padding: 0 1rem;
`;

const Embelishment = styled.div`
  flex-grow: 0;
  display: flex;
  align-items: center;
  background: #e8eff7;
  font-size: 0.875rem;
  font-family: 'Roboto mono';
  font-weight: 500;
`;

const Wrapper = styled.div<{ disabled: boolean }>`
  border-radius: 5px;
  overflow: hidden;
  border: 1px solid #f5f5f9;
  display: flex;
  &:focus-within,
  &:hover {
    border-color: ${(p) => (p.disabled ? `none` : `var(--primary)`)};
  }
`;

export const TextInput: React.FC<
  JSX.IntrinsicElements['input'] &
    BaseFormFieldProps &
    Partial<FieldProps<any>> & {
      embelishment?: React.ReactNode;
    }
> = (p) => {
  const { embelishment, autoComplete, spellCheck, type = 'text', inputMode, min, pattern, ...props } = getInputProps(p);

  return (
    <FieldWrap {...props}>
      <Wrapper disabled={props.disabled as boolean}>
        <SText
          min={min}
          type={type}
          inputMode={inputMode}
          value={props.value}
          onChange={props.onChange}
          onBlur={props.onBlur}
          name={props.name}
          pattern={pattern}
          placeholder={props.placeholder}
          disabled={props.disabled}
          autoComplete={autoComplete}
          spellCheck={spellCheck}
        />
        {embelishment && <Embelishment>{embelishment}</Embelishment>}
      </Wrapper>
    </FieldWrap>
  );
};

/**
 * Formik version
 */
export const TextField: typeof TextInput = (props) => {
  return <Field component={TextInput} {...props} />;
};

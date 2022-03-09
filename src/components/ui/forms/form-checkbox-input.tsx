import React, { FC, ReactNode } from 'react';
import { Checkbox, CheckboxProps } from '@chakra-ui/react';
import { useField } from 'formik';
import FormControl, { BaseFormProps } from './form-control';

export type FormCheckboxInputProps = BaseFormProps & {
  checkBoxProps?: CheckboxProps;
  children: ReactNode;
};

const FormCheckboxInput: FC<FormCheckboxInputProps> = React.forwardRef(
  (props: FormCheckboxInputProps, ref: React.ForwardedRef<HTMLInputElement>) => {
    const { name, label, children, checkBoxProps, ...rest } = props;
    const [field, { error, touched }] = useField(name);
    const isChecked = field.value;

    return (
      <FormControl name={name} {...rest}>
        <Checkbox
          {...field}
          id={name}
          isInvalid={!!error && touched}
          isChecked={isChecked}
          ref={ref}
          {...checkBoxProps}
        >
          {label}
          {children}
        </Checkbox>
      </FormControl>
    );
  }
);

FormCheckboxInput.displayName = 'FormCheckboxInput';
export default FormCheckboxInput;

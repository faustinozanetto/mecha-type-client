import React from 'react';
import { Textarea, TextareaProps } from '@chakra-ui/react';
import FormControl, { BaseFormProps } from './form-control';
import { useField } from 'formik';

export type FormTextAreaProps = BaseFormProps & { textAreaProps?: TextareaProps };

export const FormTextArea: React.FC<FormTextAreaProps> = (props) => {
  const { name, label, textAreaProps, ...rest } = props;
  const [field] = useField(name);

  return (
    <FormControl name={name} label={label} {...rest}>
      <Textarea {...field} id={name} {...textAreaProps} />
    </FormControl>
  );
};

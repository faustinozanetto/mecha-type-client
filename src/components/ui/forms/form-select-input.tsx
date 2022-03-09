import { Select, SelectProps } from '@chakra-ui/react';
import { useField } from 'formik';
import React, { FC } from 'react';
import FormControl, { BaseFormProps } from './form-control';

export type SelectControlProps = BaseFormProps & {
  selectProps?: SelectProps;
  children: React.ReactNode;
};

const SelectControl: FC<SelectControlProps> = React.forwardRef(
  (props: SelectControlProps, ref: React.ForwardedRef<HTMLSelectElement>) => {
    const { name, label, selectProps, children, ...rest } = props;
    const [field] = useField(name);

    return (
      <FormControl name={name} label={label} {...rest}>
        <Select {...field} id={name} ref={ref} {...selectProps}>
          {children}
        </Select>
      </FormControl>
    );
  }
);

SelectControl.displayName = 'SelectControl';

export default SelectControl;

import { Box, Flex, Switch, SwitchProps } from '@chakra-ui/react';
import { css } from '@emotion/react';
import { useField } from 'formik';
import React, { FC } from 'react';
import FormControl, { BaseFormProps } from './form-control';

export type SwitchControlProps = BaseFormProps & { switchProps?: SwitchProps };

const FormSwitchInput: FC<SwitchControlProps> = (props: SwitchControlProps) => {
  const { name, label, switchProps, ...rest } = props;
  const [field, { error, touched }] = useField(name);

  return (
    <Box
      css={css`
        .chakra-form__label {
          margin-bottom: 0;
        }
        .chakra-switch {
          display: flex;
          align-items: center;
          margin-right: 0.2rem;
        }
        .chakra-form__error-message {
          margin-top: 0;
        }
      `}
    >
      <FormControl name={name} label={label} as={Flex} alignItems="center" {...rest}>
        <Switch {...field} id={name} isInvalid={!!error && touched} isChecked={field.value} {...switchProps} />
      </FormControl>
    </Box>
  );
};

export default FormSwitchInput;

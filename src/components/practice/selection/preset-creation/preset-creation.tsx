import React from 'react';
import { Container } from '@components/ui/container/Container';
import { PresetCreationForm } from './preset-creation-form';
import { User } from '@generated/graphql';

interface PresetCreationProps {
  /** Current logged in user. */
  user: User;
}

export const PresetCreation: React.FC<PresetCreationProps> = ({ user }) => {
  return (
    <Container
      backgroundColor="#111827"
      borderRadius="15px"
      padding="1.5rem"
      flexDirection="row"
      alignContent="center"
      justifyContent="center"
      style={{ width: 'fit-content' }}
    >
      <PresetCreationForm user={user} />
    </Container>
  );
};

import React from 'react';
import { VscDebugRestart } from 'react-icons/vsc';
import { Button } from '@components/ui/buttons';
import { Icon } from '@components/ui/icons';

interface PracticeRestButtonProps {
  onClick: () => void;
}

export const PracticeRestButton: React.FC<PracticeRestButtonProps> = ({ onClick }) => {
  return (
    <Button
      backgroundColor="#9B2C2C"
      hoverBackgroundColor="#822727"
      color="#fff"
      borderRadius="md"
      fontSize="1rem"
      alignContent="center"
      justifyContent="center"
      size="lg"
      variant="solid"
      height="3rem"
      width="3rem"
      margin="0"
      padding="0"
      aria-label="Reset Test"
      onClick={onClick}
    >
      <Icon icon={<VscDebugRestart />} padding={'0'} height="30px" width="30px" color="white" />
    </Button>
  );
};

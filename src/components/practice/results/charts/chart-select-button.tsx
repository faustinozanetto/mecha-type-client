import React from 'react';
import { Button } from '@chakra-ui/react';
import { PracticeStatType } from '@typings/practice.types';

interface ChartSelectButtonProps {
  /** Name to show in the button */
  label?: PracticeStatType;
  onClick?: () => void;
}

export const ChartSelectButton: React.FC<ChartSelectButtonProps> = ({ label = PracticeStatType.WPM, onClick }) => {
  return (
    <Button
      colorScheme="purple"
      borderRadius="md"
      size="lg"
      variant="outline"
      height="3rem"
      margin="0 0.5rem 0 0.5rem"
      onClick={onClick}
    >
      {label.valueOf()}
    </Button>
  );
};

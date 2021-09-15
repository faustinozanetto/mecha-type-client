import { Button } from '@chakra-ui/react';
import React from 'react';
import { ETypingStatType } from '../../game/types/practice-game-input';

interface ChartSelectButtonProps {
  /** Name to show in the button */
  label?: ETypingStatType;
  onClick?: () => void;
}

export const ChartSelectButton: React.FC<ChartSelectButtonProps> = ({ label = ETypingStatType.WPM, onClick }) => {
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

import React from 'react';
import { useColorModeValue, Text, TextProps } from '@chakra-ui/react';

interface PracticeVisualLetterProps extends TextProps {
  /** Should highlight word? */
  highlight?: boolean;
  /** Is the letter correct? */
  correct?: boolean;
  /** Is the letter incorrect? */
  incorrect?: boolean;
  /** Wether error colors should be shown or not */
  shouldShowErrors?: boolean;
}

const PracticeVisualLetter: React.FC<PracticeVisualLetterProps> = (props) => {
  const { highlight, correct, incorrect, shouldShowErrors, children, ...rest } = props;
  const letterColor = useColorModeValue('#4e4e4e', '#797979');
  const correctColor = useColorModeValue('#000000f8', '#eee');

  return (
    <Text
      as="span"
      lineHeight="1.75rem"
      fontSize="1.3rem"
      letterSpacing="widest"
      fontWeight={500}
      color={highlight ? '#000' : incorrect && shouldShowErrors ? '#dc2626' : correct ? correctColor : letterColor}
      backgroundColor={highlight ? '#fbbf24' : ''}
      transition="all 150ms ease"
      borderBottomStyle="solid"
      borderBottomWidth="2.25px"
      borderBottomColor={shouldShowErrors && incorrect ? '#dc2626' : 'transparent'}
      {...rest}
    >
      {children}
    </Text>
  );
};
export default PracticeVisualLetter;

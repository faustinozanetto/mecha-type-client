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
  const letterColor = useColorModeValue('#201d1d', '#a1a1a1');
  const correctColor = useColorModeValue('#000', '#eee');

  return (
    <Text
      as="span"
      lineHeight="1.5rem"
      fontSize="1.5rem"
      letterSpacing="widest"
      fontWeight={500}
      color={highlight ? '#000' : incorrect && shouldShowErrors ? '#dc2626' : correct ? correctColor : letterColor}
      backgroundColor={highlight ? '#fbbf24' : ''}
      transition="all 0.25s ease 0s"
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

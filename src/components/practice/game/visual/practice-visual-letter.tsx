import React from 'react';
import { useColorModeValue, Text, TextProps } from '@chakra-ui/react';

interface PracticeVisualLetterProps extends TextProps {
  /** Should highlight word? */
  highlight?: boolean;
  /** Is the letter correct? */
  correct?: boolean;
  /** Is the letter incorrect? */
  incorrect?: boolean;
}

export const PracticeVisualLetter: React.FC<PracticeVisualLetterProps> = (props) => {
  const { highlight, correct, incorrect, children, ...rest } = props;
  const letterColor = useColorModeValue('#161616d6', '#f3f4f6dd');

  return (
    <Text
      as="span"
      fontWeight={500}
      color={highlight ? '#000' : incorrect ? '#dc2626' : correct ? letterColor : '#898d95'}
      backgroundColor={highlight ? '#fbbf24' : ''}
      transitionProperty="all"
      transitionDuration="200ms"
      borderBottomStyle="solid"
      borderBottomWidth="2px"
      borderBottomColor={incorrect ? '#dc2626' : 'transparent'}
      {...rest}
    >
      {children}
    </Text>
  );
};

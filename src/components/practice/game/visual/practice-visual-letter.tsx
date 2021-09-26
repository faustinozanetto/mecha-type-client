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

const PracticeVisualLetter: React.FC<PracticeVisualLetterProps> = (props) => {
  const { highlight, correct, incorrect, children, ...rest } = props;
  const letterColor = useColorModeValue('#161616d6', '#b6b6b6dd');
  const correctColor = useColorModeValue('#000000f8', '#f3f3f3');

  return (
    <Text
      as="span"
      lineHeight="1.75rem"
      fontSize="1.3rem"
      fontWeight={500}
      color={highlight ? '#000' : incorrect ? '#dc2626' : correct ? correctColor : letterColor}
      backgroundColor={highlight ? '#fbbf24' : ''}
      transitionProperty="all"
      transitionDuration="100ms"
      borderBottomStyle="solid"
      borderBottomWidth="2.25px"
      borderBottomColor={incorrect ? '#dc2626' : 'transparent'}
      {...rest}
    >
      {children}
    </Text>
  );
};
export default PracticeVisualLetter;

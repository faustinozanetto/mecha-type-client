import { useColorModeValue } from '@chakra-ui/color-mode';
import React from 'react';
import styled, { css } from 'styled-components';

const Letter = styled.span<{ defaultColor: string; highlight?: boolean; correct?: boolean; incorrect?: boolean }>`
  font-weight: 500;
  color: #9ca3af;
  color: ${(props) => props.defaultColor};
  transition: all 100ms;

  border-bottom-style: solid;
  border-bottom-width: 0.05em;
  border-bottom-color: transparent;

  ${(props) =>
    props.highlight &&
    css`
      color: black;
      background-color: #fbbf24;
    `}
  ${(props) =>
    props.incorrect &&
    css`
      color: #dc2626;
      border-bottom: 2px solid #dc2626;
    `}
  ${(props) =>
    props.correct &&
    css`
      color: ${useColorModeValue('#000', '#f3f4f6')};
    `}
`;

interface PracticeVisualLetterProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Should highlight word? */
  highlight?: boolean;
  /** Is the letter correct? */
  correct?: boolean;
  /** Is the letter incorrect? */
  incorrect?: boolean;
}

export const PracticeVisualLetter = React.forwardRef<HTMLSpanElement, PracticeVisualLetterProps>((props, ref) => {
  const { highlight, correct, incorrect, children, ...rest } = props;
  const letterColor = useColorModeValue('#1a1a1ad8', '#f3f4f6c8');
  return (
    <Letter
      ref={ref}
      defaultColor={letterColor}
      highlight={highlight}
      correct={correct}
      incorrect={incorrect}
      {...rest}
    >
      {children}
    </Letter>
  );
});
PracticeVisualLetter.displayName = 'PracticeVisualLetter';

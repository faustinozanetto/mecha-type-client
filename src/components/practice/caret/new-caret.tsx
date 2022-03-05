import { Box, BoxProps, keyframes } from '@chakra-ui/react';
import React from 'react';

type NewCaretProps = BoxProps & {
  playFlashAnim: boolean;
};

const flash = keyframes`
  0%,
  100% {
    opacity: 0;
  }

  50% {
    opacity: 1;
  }
`;

const NewCaret = React.forwardRef<HTMLDivElement, NewCaretProps>((props, ref) => {
  const { playFlashAnim, ...rest } = props;
  return (
    <Box
      ref={ref}
      background="#e2b714"
      height="1.5rem"
      position="absolute"
      transformOrigin="top left"
      width="0.7em"
      borderRadius={0}
      marginLeft="0.25rem"
      opacity="1"
      zIndex={2}
      animation={playFlashAnim ? `${flash} 1s infinite` : ''}
      transform="scale(1.35)"
      transitionProperty="left"
      transitionDuration="150ms"
      {...rest}
    />
  );
});

NewCaret.displayName = 'NewCaret';
export default NewCaret;

import { Box, BoxProps, keyframes } from '@chakra-ui/react';
import { CaretStyle, UserSettings } from '@generated/graphql';
import React, { useEffect, useState } from 'react';

type NewCaretProps = BoxProps & {
  playFlashAnim: boolean;
  settings: UserSettings;
};

interface CaretStyleType {
  type: CaretStyle;
  styles: BoxProps;
}

const caretStyles: CaretStyleType[] = [
  {
    type: CaretStyle.Line,
    styles: {
      width: '2px',
    },
  },
  {
    type: CaretStyle.Block,
    styles: {
      width: '0.7em',
      marginLeft: '0.2rem',
      borderRadius: 0,
    },
  },
  {
    type: CaretStyle.Hollow,
    styles: {
      width: '0.7em',
      marginLeft: '0.2rem',
      borderRadius: 0,
    },
  },
];

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
  const {
    playFlashAnim,
    settings = {
      blindMode: false,
      typeSounds: false,
      typeSoundsVolume: 0,
      pauseOnError: false,
      noBackspace: false,
      caretStyle: CaretStyle.Line,
      caretColor: '#ffb300',
    },
    ...rest
  } = props;
  const [style, setStyle] = useState<CaretStyleType>(caretStyles[0]);
  const [color, setColor] = useState<BoxProps>();

  useEffect(() => {
    // Main styles
    caretStyles.map((style) => {
      if (style.type === settings.caretStyle) {
        setStyle(style);
      }
    });
    // Color handling
    if (settings.caretStyle !== CaretStyle.Hollow) {
      // Set color to background.
      setColor({ background: settings.caretColor });
    } else {
      // If hollow set color to the border
      setColor({ border: `2px solid ${settings.caretColor}`, background: 'transparent' });
    }
  }, [settings.caretColor, settings.caretStyle]);

  return (
    <Box
      ref={ref}
      height="1.5rem"
      position="absolute"
      transformOrigin="top left"
      borderRadius="0.5em"
      opacity="1"
      zIndex={2}
      animation={playFlashAnim ? `${flash} 1s infinite` : ''}
      transform="scale(1.35)"
      transitionProperty="left"
      transitionDuration="150ms"
      {...style.styles}
      {...color}
      {...rest}
    />
  );
});

NewCaret.displayName = 'NewCaret';
export default NewCaret;

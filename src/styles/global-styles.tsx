import { useTypingGameContext } from '@contexts/typing-game.context';
import { Global } from '@emotion/react';
import { AvailableFontFamilies, fontConfigurations, injectFontFamily } from '@modules/core/fonts/fonts';

interface GlobalStylesProps {
  fonts?: AvailableFontFamilies;
}

const GlobalStyles: React.FC<GlobalStylesProps> = (props) => {
  const { fonts, ...rest } = props;
  const { hideCursor } = useTypingGameContext();

  const fontName: AvailableFontFamilies = 'Poppins';
  const fontFamily = injectFontFamily(fontConfigurations.find((font) => font.fontName === fontName));

  return (
    <Global
      styles={`
      * {
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }

      html {
        text-rendering: optimizeLegibility;
        font-feature-settings: "kern";
      }
      body {
        transition: all 0.25s ease 0s;
        ${hideCursor ? 'cursor: none' : 'cursor: default'}
      }
  `}
    />
  );
};

export default GlobalStyles;

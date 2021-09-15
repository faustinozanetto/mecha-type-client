import styled, { css } from 'styled-components';
import { ButtonProps } from './index';

export const StyledButton = styled.button<ButtonProps>`
  ${(props) => props.customCss};
  /* Display */
  display: inline-flex;
  position: relative;
  appearance: none;

  /* Alignment */
  align-content: ${(props) => props.alignContent};
  align-items: ${(props) => props.alignItems};
  justify-content: ${(props) => props.justifyContent};

  width: ${(props) => props.width};
  ${(props) =>
    props.height
      ? css`
          height: ${props.height} !important;
        `
      : ''};

  ${(props) =>
    props.paddingInline
      ? css`
          padding-inline: ${props.paddingInline} !important;
        `
      : ''};
  padding: ${(props) => props.padding};
  margin: ${(props) => props.margin};

  /* Outline & Shadow */
  outline: none;
  ${(props) => parseBoxShadow(props)};

  /* Transition */
  transition-property: all;
  transition-duration: 200ms;

  user-select: none;
  white-space: nowrap;

  /* Outline */
  outline: 2px solid transparent;
  outline-offset: 2px;

  /* Color */
  color: ${(props) => props.color};
  background: ${(props) => props.backgroundColor};

  /* Font */
  font-weight: ${(props) => props.fontWeight};
  font-family: 'Poppins', sans-serif;
  line-height: 1.2;
  ${(props) =>
    props.fontSize
      ? css`
          font-size: ${props.fontSize} !important;
        `
      : ''};

  /* Size */
  ${(props) => (props.size ? buttonSizes(props)[props.size] : '')}

  /* Variant */
  ${(props) => (props.variant ? buttonVariants(props)[props.variant] : '')}

  border-radius: ${(props) => parseBorderRadius(props.borderRadius)};

  & > span {
    transition: all 250ms;
  }

  &:hover {
    color: ${(props) => props.hoverColor} !important;
    background-color: ${(props) => props.hoverBackgroundColor};
    cursor: pointer;
    & > * {
      color: ${(props) => props.hoverColor} !important;
    }
  }

  &,
  ::before,
  ::after {
    overflow-wrap: break-word;
    box-sizing: border-box;
  }
`;

const buttonSizes = (props: ButtonProps) => {
  switch (props.size!) {
    case 'xs': {
      return {
        xs: css`
          font-size: 0.75rem;
          height: 1.5rem;
          min-width: 1.5rem;
          padding-inline: 0.5rem;
        `,
      };
    }
    case 'sm': {
      return {
        sm: css`
          font-size: 0.875rem;
          height: 2rem;
          min-width: 2rem;
          padding-inline: 0.75rem;
        `,
      };
    }
    case 'md': {
      return {
        md: css`
          font-size: 1rem;
          height: 2.5rem;
          min-width: 2.5rem;
          line-height: 1.25rem;
          padding-inline: 1rem;
        `,
      };
    }
    case 'lg': {
      return {
        lg: css`
          font-size: 1rem;
          height: 3rem;
          min-width: 3rem;
          padding-inline: 1.5rem;
        `,
      };
    }
  }
};

const buttonVariants = (props: ButtonProps) => {
  switch (props.variant!) {
    case 'solid': {
      return {
        solid: css`
          &,
          ::before,
          ::after {
            border-color: #e2e8f0;
            border-width: 0px;
            border-style: solid;
          }
        `,
      };
    }
    case 'ghost': {
      return {
        ghost: css`
          background-color: transparent;
          box-shadow: none;

          &,
          ::before,
          ::after {
            border-color: #e2e8f0;
            border-width: 0px;
            border-style: solid;
          }
        `,
      };
    }
    case 'outline': {
      return {
        outline: css`
          border: 2px solid;
          border-color: currentColor;
        `,
      };
    }
    case 'link': {
      return {
        link: css`
          background-color: transparent;
          box-shadow: none;

          &:hover {
            text-decoration: underline;
          }

          &,
          ::before,
          ::after {
            border-color: #e2e8f0;
            border-width: 0px;
            border-style: solid;
          }
        `,
      };
    }
  }
};

const parseBoxShadow = (props: ButtonProps) => {
  switch (props.boxShadow!) {
    case 'none': {
      return css``;
    }
    case 'xs': {
      return css`
        box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.05);
      `;
    }
    case 'sm': {
      return css`
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
      `;
    }
    case 'base': {
      return css`
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
      `;
    }
    case 'md': {
      return css`
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
      `;
    }
    case 'lg': {
      return css`
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
      `;
    }
    case 'xl': {
      return css`
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
      `;
    }
  }
};

const parseBorderRadius = (borderRadius?: 'none' | 'sm' | 'md' | 'lg'): string => {
  if (borderRadius) {
    switch (borderRadius) {
      case 'none': {
        return '0px';
      }
      case 'sm': {
        return '5px';
      }
      case 'md': {
        return '10px';
      }
      case 'lg': {
        return '15px';
      }
    }
  }
  return '';
};

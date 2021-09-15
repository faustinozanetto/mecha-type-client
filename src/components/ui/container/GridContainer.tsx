import React from 'react';
import styled, { DefaultTheme, css, FlattenSimpleInterpolation } from 'styled-components';
import { SystemProps } from '@chakra-ui/system';

interface IGridContainerProps {
  backgroundColor?: SystemProps['backgroundColor'];
  borderRadius?: SystemProps['borderRadius'];
  /** Container content alignment */
  alignContent?: SystemProps['alignContent'];
  /** Container items alignment */
  alignItems?: SystemProps['alignItems'];
  /** Container justify */
  justifyContent?: SystemProps['justifyContent'];
  /** Margin */
  margin?: SystemProps['margin'];
  /** Padding */
  padding?: SystemProps['padding'];
  customCSS?: FlattenSimpleInterpolation;
}

const StyledContainer = styled.div<IGridContainerProps>`
  display: grid;

  /* Alignment */
  align-content: ${(props) => props.alignContent};
  align-items: ${(props) => props.alignItems};
  justify-content: ${(props) => props.justifyContent};

  padding: ${(props) => props.padding};
  margin: ${(props) => props.margin};

  margin-bottom: 1rem;

  ${(props) => props.customCSS};

  background-color: ${(props) => props.backgroundColor};

  border-radius: ${(props) => props.borderRadius};

  font-size: 1.25rem;
  line-height: 1.75rem;
  user-select: none;

  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
    rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
`;

export interface GridContainerProps extends React.HTMLAttributes<HTMLDivElement>, IGridContainerProps {
  customCSS?: FlattenSimpleInterpolation;
}

export const GridContainer = React.forwardRef<HTMLDivElement, GridContainerProps>((props, ref) => {
  const {
    backgroundColor = '#111827',
    borderRadius = '20px',
    alignContent = 'center',
    alignItems = 'center',
    justifyContent = 'center',
    margin = '1rem',
    padding = '1rem',
    customCSS,
    children,
    ...rest
  } = props;
  return (
    <StyledContainer
      ref={ref}
      backgroundColor={backgroundColor}
      borderRadius={borderRadius}
      alignContent={alignContent}
      alignItems={alignItems}
      justifyContent={justifyContent}
      margin={margin}
      padding={padding}
      customCSS={customCSS}
      {...rest}
    >
      {children}
    </StyledContainer>
  );
});
GridContainer.displayName = 'GridContainer';

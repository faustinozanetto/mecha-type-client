import React from 'react';
import styled from 'styled-components';
import { SystemProps } from '@chakra-ui/system';

interface IContainerProps {
  backgroundColor?: SystemProps['backgroundColor'];
  borderRadius?: SystemProps['borderRadius'];
  flexDirection?: SystemProps['flexDir'];
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
  width?: SystemProps['width'];
}

const StyledContainer = styled.div<IContainerProps>`
  display: flex;
  flex-direction: ${(props) => props.flexDirection};

  /* Alignment */
  align-content: ${(props) => props.alignContent};
  align-items: ${(props) => props.alignItems};
  justify-content: ${(props) => props.justifyContent};

  padding: ${(props) => props.padding};
  margin: ${(props) => props.margin};

  margin-bottom: 1rem;

  background-color: ${(props) => props.backgroundColor};

  border-radius: ${(props) => props.borderRadius};

  width: ${(props) => props.width};

  font-size: 1.25rem;
  line-height: 1.75rem;
  user-select: none;

  box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
    rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
`;

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement>, IContainerProps {}

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>((props, ref) => {
  const {
    backgroundColor = '#111827',
    borderRadius = '20px',
    flexDirection = 'column',
    alignContent = 'center',
    alignItems = 'center',
    justifyContent = 'center',
    margin = '1rem',
    padding = '1rem',
    width = 'auto',
    children,
    ...rest
  } = props;
  return (
    <StyledContainer
      ref={ref}
      backgroundColor={backgroundColor}
      borderRadius={borderRadius}
      flexDirection={flexDirection}
      alignContent={alignContent}
      alignItems={alignItems}
      justifyContent={justifyContent}
      margin={margin}
      padding={padding}
      width={width}
      {...rest}
    >
      {children}
    </StyledContainer>
  );
});
Container.displayName = 'Container';

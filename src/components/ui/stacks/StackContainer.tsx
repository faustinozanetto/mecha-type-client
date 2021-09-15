import React from 'react';
import { SystemProps } from '@chakra-ui/system';
import { StyledStack } from './styles';

export type IStackProps = {
  className?: string;
  /** Set the padding */
  padding?: string;
  /** Set the margin */
  margin?: string;
  /** Direction to stack the items */
  direction?: SystemProps['flexDir'];
  /** Justify content  */
  justify?: SystemProps['justifyContent'];
  /** Item alignment */
  align?: SystemProps['alignItems'];
  /** Wrap */
  wrap?: SystemProps['flexWrap'];
  /** Margin */
  spacing?: SystemProps['margin'];
  /* React node */
  children?: React.ReactNode;
};

export interface StackProps extends React.HTMLAttributes<HTMLDivElement>, IStackProps {}

export const Stack = React.forwardRef<HTMLDivElement, StackProps>((props, ref) => {
  const {
    children,
    className,
    padding,
    margin,
    direction = 'row',
    justify = 'center',
    align = 'center',
    spacing,
    wrap,
    ...rest
  } = props;

  return (
    <StyledStack
      ref={ref}
      className={className}
      padding={padding}
      margin={margin}
      direction={direction}
      justify={justify}
      align={align}
      wrap={wrap}
      spacing={spacing}
      {...rest}
    >
      {children}
    </StyledStack>
  );
});
Stack.displayName = 'Stack';

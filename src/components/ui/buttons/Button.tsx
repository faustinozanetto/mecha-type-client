import React from 'react';
import { StyledButton } from './styles';
import { FlattenSimpleInterpolation } from 'styled-components';
import { SystemProps } from '@chakra-ui/system';

export interface IButtonProps {
  className?: string;
  /** Express button as other html component */

  /** Shows loading text */
  loading?: boolean;
  /** Makes button disabled */
  disabled?: boolean;
  /** Makes button active */
  active?: boolean;
  /**  The label to show in the button when loading is true */
  loadingText?: string;
  /** Set the original html type of button */
  type?: 'button' | 'reset' | 'submit';
  /**  Adds icon before button label */
  leftIcon?: React.ReactElement;
  /**  Adds icon after button label */
  rightIcon?: React.ReactElement;
  /** Set the padding */
  padding?: SystemProps['padding'];
  /** Set the inline padding */
  paddingInline?: SystemProps['paddingInline'];
  /** Set the margin */
  margin?: SystemProps['margin'];
  /**  Set the button color */
  color?: string;
  /** Set the background color */
  backgroundColor?: SystemProps['backgroundColor'];
  /** Set the button color on hover */
  hoverColor?: string;
  /** Set the background color on hover */
  hoverBackgroundColor?: SystemProps['backgroundColor'];
  /** Set the weight of the font */
  fontWeight?: SystemProps['fontWeight'];
  /** Font size */
  fontSize?: SystemProps['fontSize'];
  /** Size of the button */
  size?: 'xs' | 'sm' | 'md' | 'lg';
  /** Controls button appearance */
  variant?: 'solid' | 'ghost' | 'outline' | 'link';
  /** Controls the radius of the corners */
  borderRadius?: 'none' | 'sm' | 'md' | 'lg';
  /** Button width */
  width?: SystemProps['width'];
  /** Button height */
  height?: SystemProps['height'];
  /** Box shadow type */
  boxShadow?: 'none' | 'xs' | 'sm' | 'base' | 'md' | 'lg' | 'xl';
  /** Button content alignment */
  alignContent?: SystemProps['alignContent'];
  /** Button items alignment */
  alignItems?: SystemProps['alignItems'];
  /** Button justify */
  justifyContent?: SystemProps['justifyContent'];
  /** Custom CSS passed as css`` */
  customCss?: FlattenSimpleInterpolation;
  /** Button children */
  children?: React.ReactNode;
}

export interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement>, IButtonProps {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const {
    disabled: _disabled,
    loading,
    active,
    loadingText,
    type,
    leftIcon,
    rightIcon,
    children,
    className,
    padding,
    paddingInline = '1rem',
    margin = '0.25rem',
    color,
    backgroundColor,
    hoverColor,
    hoverBackgroundColor,
    fontWeight = 700,
    fontSize,
    size = 'md',
    variant = 'solid',
    borderRadius = 'md',
    width,
    height,
    boxShadow = 'xs',
    alignContent = 'center',
    alignItems = 'center',
    justifyContent = 'center',
    customCss,
    ...rest
  } = props;

  const disabled = _disabled || loading;

  return (
    <StyledButton
      ref={ref}
      className={className}
      disabled={disabled}
      aria-disabled={disabled}
      type={type}
      data-active={active ? 'true' : undefined}
      data-color={color ? color : undefined}
      padding={padding}
      paddingInline={paddingInline}
      margin={margin}
      color={color}
      backgroundColor={backgroundColor}
      hoverColor={hoverColor}
      hoverBackgroundColor={hoverBackgroundColor}
      fontWeight={fontWeight}
      fontSize={fontSize}
      variant={variant}
      borderRadius={borderRadius}
      width={width}
      height={height}
      size={size}
      boxShadow={boxShadow}
      alignContent={alignContent}
      alignItems={alignItems}
      justifyContent={justifyContent}
      customCss={customCss}
      {...rest}
    >
      {leftIcon && !loading ? leftIcon : null}
      {loading ? loadingText || <span style={{ opacity: 0 }}>{children}</span> : children}
      {rightIcon && !loading ? rightIcon : null}
    </StyledButton>
  );
});
Button.displayName = 'Button';

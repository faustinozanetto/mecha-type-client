import React from "react";
import styled from "styled-components";
import { SystemProps } from "@chakra-ui/system";

interface IconContainerProps {
  width?: SystemProps["width"];
  height?: SystemProps["height"];
  opacity?: SystemProps["opacity"];
  color?: string;
  padding?: SystemProps["padding"];
  hoverAnimation?: boolean;
}

const IconContainer = styled.div<IconContainerProps>`
  display: flex;
  align-content: center;
  justify-content: center;
  padding: ${(props) => props.padding};
  transition: all 300ms ease-out;

  text-align: center;
  line-height: 60px;

  & > svg {
    width: ${(props) => props.width};
    height: ${(props) => props.height};
    opacity: ${(props) => props.opacity};
    transition: all 300ms ease-out;
  }

  ${(props) =>
    props.hoverAnimation &&
    `
  &:hover {
    transform: scale(1.2);
  }
  `}

  color: ${(props) => props.color};
`;

interface IIConProps {
  icon: JSX.Element;
  width?: SystemProps["width"];
  height?: SystemProps["height"];
  opacity?: SystemProps["opacity"];
  color?: string;
  padding?: SystemProps["padding"];
  hoverAnimation?: boolean;
}

export interface IconProps extends React.HTMLAttributes<HTMLDivElement>, IIConProps {}

export const Icon: React.FC<IconProps> = ({
  icon,
  width = "1.5em",
  height = "1.5em",
  opacity = "1",
  color = "white",
  padding = "0 0.5em 0 0",
  hoverAnimation = false,
  ...rest
}) => {
  return (
    <IconContainer
      width={width}
      height={height}
      opacity={opacity}
      color={color}
      padding={padding}
      hoverAnimation={hoverAnimation}
      {...rest}
    >
      {icon}
    </IconContainer>
  );
};

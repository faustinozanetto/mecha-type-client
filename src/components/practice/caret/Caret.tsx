import React from "react";
import styled from "styled-components";

const CaretElement = styled.span`
  position: absolute;
  display: inline;
  border-color: #0ea5e9;
  border-left-width: 3px;

  animation-name: flash;
  animation-iteration-count: infinite;
  animation-duration: 1s;
  transition: 0.12s;

  @keyframes flash {
    0%,
    100% {
      opacity: 0;
    }

    50% {
      opacity: 1;
    }
  }
`;

interface CaretProps extends React.HTMLAttributes<HTMLSpanElement> {}

export const Caret = React.forwardRef<HTMLSpanElement, CaretProps>((props, ref) => {
  const { children, ...rest } = props;

  return (
    <CaretElement ref={ref} {...rest}>
      {children}
    </CaretElement>
  );
});
Caret.displayName = "Caret";

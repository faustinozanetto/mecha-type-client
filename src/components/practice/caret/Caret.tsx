import React from 'react';
import { Text } from '@chakra-ui/react';

// const CaretElement = styled.span`
//   position: absolute;
//   display: inline;
//   border-color: #0ea5e9;
//   border-left-width: 3px;

//   animation-name: flash;
//   animation-iteration-count: infinite;
//   animation-duration: 1s;
//   transition: 0.12s;

//   @keyframes flash {
//     0%,
//     100% {
//       opacity: 0;
//     }

//     50% {
//       opacity: 1;
//     }
//   }
// `;

interface CaretProps extends React.HTMLAttributes<HTMLSpanElement> {}

export const Caret: React.FC<CaretProps> = (props) => {
  const { children, ...rest } = props;

  return (
    <Text
      as="span"
      position="absolute"
      display="inline"
      borderColor="#e9950e"
      borderLeftWidth="3px"
      sx={{}}
      {...rest}
      transitionProperty="all"
      transitionDuration="100ms"
    >
      {children}
    </Text>
  );
};

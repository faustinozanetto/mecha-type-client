import React from 'react';

// const WordElement = styled.div<{ error?: boolean }>`
//   display: flex;
//   margin: 0.25rem;
//   border-bottom: 2px solid transparent;
//   line-height: 1.5rem;
//   font-size: 1.5rem;
//   color: #646669;

//   ${(props) =>
//     props.error &&
//     css`
//       border-bottom: 2px solid #da3333;
//       text-shadow: 1px 0px 0px #111, -1px 0px 0px #111, 0px 1px 0px #111 1px 1px 0px #111, -1px 1px 0px #111;
//     `}
// `;

interface WordProps {
  active?: boolean;
  error?: boolean;
}

export const PracticeVisualWord: React.FC<WordProps> = ({ children, error }) => {
  return <span>{children}</span>;
};

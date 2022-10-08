import React from 'react';

interface ILetterProps {
  children?: React.ReactNode;
}

const Letter: React.FC<ILetterProps> = (props) => {
  const { children } = props;

  return <span className={clsx()}>{children}</span>;
};

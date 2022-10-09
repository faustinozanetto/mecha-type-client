import clsx from 'clsx';
import React, { memo } from 'react';

interface ILetterProps {
  children?: React.ReactNode;
  letterState: number;
}

const Letter: React.FC<ILetterProps> = (props) => {
  const { children, letterState } = props;

  return (
    <span
      className={clsx(
        'border-b-4 text-font',
        letterState === 2 ? 'border-font' : '',
        letterState === 1 ? 'border-correct text-correct' : '',
        letterState === 0 ? 'border-none' : ''
      )}
    >
      {children}
    </span>
  );
};

export default memo(Letter);

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
        'border-b-4',
        letterState === 2 ? 'border-letter-wrong text-letter-wrong' : '',
        letterState === 1 ? 'border-letter-correct text-letter-correct' : '',
        letterState === 0 ? 'border-none text-letter' : ''
      )}
    >
      {children}
    </span>
  );
};

export default memo(Letter);

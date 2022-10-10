import clsx from 'clsx';
import React from 'react';

interface ICaretProps {
  pos: {
    left: number;
    top: number;
  };
  phase: number;
  currIndex: number;
}

const Caret: React.FC<ICaretProps> = (props) => {
  const { pos, phase, currIndex } = props;
  return (
    <span
      style={{
        left: pos.top < 0 ? -2 : pos.left,
        top: pos.top < 0 ? 2 : pos.top + 2,
      }}
      className={clsx('absolute inline transition-all text-caret', {
        '-mt-[2px]': currIndex === -1,
        'animate-blink': phase === 0,
      })}
    >
      {phase !== 2 && '|'}
    </span>
  );
};

export default Caret;

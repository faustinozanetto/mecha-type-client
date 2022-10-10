import React, { useEffect, useRef, useState } from 'react';
import TypingInput from './typing-input';

const TypingGame: React.FC = () => {
  const [list, setList] = useState<string>(
    'might true tape major write city vote another push blood argue back secure good honest instead Christmas take early income how value blue line even paint club person middle hate character space boy around rule floor serious one awful picture marry hope prepare left equal small add safe period student south kid park further print green young fit jesus interest staff common give before judge absolute love quite whether file girl item please foot strike oppose programme attend home minute appear '
  );

  const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const buttonRef = useRef() as React.MutableRefObject<HTMLButtonElement>;

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'tab') {
        buttonRef.current.focus();
      } else if (event.key !== 'Enter') {
        inputRef.current.focus();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);
  return (
    <section className="flex flex-col space-y-2">
      {/* Title */}
      <h2 className="text-3xl font-bold text-text-white dark:text-text-dark">Typing Test</h2>
      <TypingInput ref={inputRef} text={list} time={40} />
    </section>
  );
};

export default TypingGame;

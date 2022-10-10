import { TypingTestEntry } from '@prisma/client';
import clsx from 'clsx';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import useTypingGame from 'react-typing-game-hook';
import Caret from './caret';
import Letter from './letter';

interface ITypingInputProps {
  text: string;
  time: number;
  onFinished: (typingTestEntry: Omit<TypingTestEntry, 'createdAt' | 'updatedAt' | 'userId' | 'id'>) => void;
}

const TypingInput = React.forwardRef<HTMLInputElement, ITypingInputProps>(({ text, time, onFinished }, ref) => {
  const [duration, setDuration] = useState<number>(0);
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const letterElements = useRef<HTMLDivElement>(null);

  const [timeLeft, setTimeLeft] = useState<number>(time);

  const {
    states: { charsState, currIndex, phase, correctChar, errorChar, startTime, endTime },
    actions: { insertTyping, deleteTyping, resetTyping, endTyping },
  } = useTypingGame(text, { skipCurrentWordOnSpace: false, pauseOnError: false });

  const [currentRow, setCurrentRow] = useState<number>(0);
  const [value, setValue] = useState<string>('');

  // set cursor
  const pos = useMemo(() => {
    if (currIndex !== -1 && letterElements.current) {
      const spanref = letterElements.current.children[currIndex] as HTMLSpanElement;
      const left = spanref.offsetLeft + spanref.offsetWidth - 2;
      const top = spanref.offsetTop - 2;
      if (top > 60) {
        setCurrentRow((prev) => prev + 1);
        return {
          left,
          top: top / 2,
        };
      }
      return { left, top };
    } else {
      return {
        left: -2,
        top: 2,
      };
    }
  }, [currIndex]);

  // Reset state when time or text changes
  useEffect(() => {
    setValue('');
    setCurrentRow(0);
    setTimeLeft(time);
    endTyping();
    resetTyping();
  }, [text, time]);

  // handle timer
  useEffect(() => {
    const timerInterval = setInterval(() => {
      if (startTime) {
        setTimeLeft((timeLeft) => {
          if (timeLeft === 1) {
            clearInterval(timerInterval);
            endTyping();
          }
          return time - Math.floor((Date.now() - startTime) / 1000);
        });
      }
    }, 1000);
    if (phase === 2) {
      clearInterval(timerInterval);
    }

    return () => clearInterval(timerInterval);
  }, [startTime, phase]);

  //set WPM
  useEffect(() => {
    if (phase === 2 && endTime && startTime) {
      const dur = Math.floor((endTime - startTime) / 1000);
      setDuration(dur);
      onFinished({
        wpm: Math.round(((60 / dur) * correctChar) / 5),
        cpm: Math.round((60 / dur) * correctChar),
        keystrokes: 0,
        correctChars: correctChar,
        incorrectChars: errorChar,
        accuracy: (correctChar / (correctChar + errorChar)) * 100,
      });
    } else {
      setDuration(0);
    }
  }, [phase, startTime, endTime, ref]);

  //handle key presses
  const handleKeyDown = (letter: string, control: boolean) => {
    if (letter === 'Backspace') {
      const spanref = letterElements?.current?.children[currIndex] as HTMLSpanElement;
      const top = spanref?.offsetTop - 2;

      if (top < 0) {
        return;
      }
      deleteTyping(control);
    } else if (letter.length === 1) {
      insertTyping(letter);
    }
  };

  /**
   * Handles the change in the input element.
   * @param event of the input onChange method.
   */
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue((prev) => {
      if (prev.length > event.target.value.length) {
        handleKeyDown('Backspace', false);
      } else {
        handleKeyDown(event.target.value.slice(-1), false);
      }
      return event.target.value;
    });
  };

  return (
    <div className="relative w-full p-4 rounded-xl">
      <span className="text-3xl text-fg/80">
        {timeLeft}
        <span className="text-2xl">s left</span>
      </span>
      <div
        className="relative z-40 h-[160px] w-full text-2xl outline-none"
        onClick={() => {
          if (ref != null && typeof ref !== 'function') {
            ref.current?.focus();
          }
          setIsFocused(true);
        }}
      >
        <input
          type="text"
          className="absolute left-0 top-0 z-20 h-full w-full cursor-default opacity-0"
          tabIndex={1}
          ref={ref}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          value={value}
          onChange={handleInputChange}
          onKeyDown={(e) => {
            if (e.ctrlKey) return;
            if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key)) e.preventDefault();
          }}
        />
        <div
          className={clsx('absolute -top-4 z-10 h-4 w-full transition-all duration-200', {
            'opacity-0': !isFocused,
          })}
        ></div>
        <div
          className={clsx('absolute -bottom-1 z-10 h-8 w-full transition-all duration-200', {
            'opacity-0': !isFocused,
          })}
        ></div>
        <span
          className={clsx(
            'absolute z-20 flex h-full w-full cursor-default items-center justify-center text-base opacity-0 transition-all duration-200',
            { 'text-fg opacity-100 ': !isFocused }
          )}
        >
          Click or press any key to focus
        </span>
        <div
          className={clsx(
            'absolute top-0 left-0 mb-4 h-full w-full overflow-hidden text-justify leading-relaxed tracking-wide transition-all duration-200',
            { 'opacity-40 blur-[8px]': !isFocused }
          )}
        >
          {/* Letters */}
          <div
            ref={letterElements}
            className={clsx('transition-[margin] duration-300')}
            style={{
              marginTop: currentRow > 0 ? currentRow * -40 : 0,
            }}
          >
            {text.split('').map((letter, index) => {
              const state = charsState[index] || 0;
              return (
                <Letter key={letter + index} letterState={state}>
                  {letter}
                </Letter>
              );
            })}
          </div>
        </div>
        {/* Caret */}
        {isFocused ? <Caret pos={pos} currIndex={currIndex} phase={phase} /> : null}
      </div>
    </div>
  );
});

export default TypingInput;

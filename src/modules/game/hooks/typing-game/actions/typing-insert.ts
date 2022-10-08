import { ActionItemType } from '.';
import { ITypingStateType } from '../use-typing-game';

export default (state: ITypingStateType, action: ActionItemType): ITypingStateType => {
  let {
    startTime,
    endTime,
    chars,
    charsState,
    length,
    currIndex,
    correctChar,
    errorChar,
    spaceChar,
    keystrokes,
    phase,
    skipCurrentWordOnSpace,
    pauseOnError,
    countErrors,
  } = state;
  let letter = action.payload ?? null;
  let newStartTime = startTime;
  let newEndTime = endTime;

  // Test has finished.
  if (phase === 2) {
    return state;
  }

  // Test has not started yet, so we start it.
  if (phase === 0) {
    phase = 1;
    newStartTime = new Date().getTime();
  }

  let newCharsState = [...charsState];
  if (letter === ' ' && chars[currIndex + 1] !== ' ' && skipCurrentWordOnSpace) {
    let newIndex = chars.indexOf(letter, currIndex);
    currIndex = newIndex === -1 ? length - 1 : newIndex;
  } else {
    if (letter !== null) {
      // Error handling
      if (chars[currIndex + 1] !== letter) {
        if (newCharsState[currIndex + 1] == 2) {
          if (countErrors === 'everytime') {
            errorChar += 1;
          }
        } else {
          newCharsState[currIndex + 1] = 2;
          errorChar += 1;
        }
        if (!pauseOnError) {
          keystrokes += 1;
          currIndex += 1;
        }
      } else {
        // Spaces handling
        if (chars[currIndex + 1] === ' ') {
          spaceChar += 1;
        }
        // Correct char handling
        if (newCharsState[currIndex + 1] === 2 && pauseOnError && countErrors === 'once') {
          errorChar -= 1;
        }
        newCharsState[currIndex + 1] = 1;
        correctChar += 1;
        keystrokes += 1;
        currIndex += 1;
      }
    } else {
      currIndex += 1;
      keystrokes += 1;
    }
  }

  if (currIndex >= length - 1) {
    newEndTime = new Date().getTime();
    phase = 2;
  }
  let currChar: string = (currIndex >= 0 ? chars[currIndex] : '') ?? '';
  return {
    ...state,
    charsState: newCharsState,
    errorChar,
    correctChar,
    spaceChar,
    keystrokes,
    currIndex,
    currChar,
    phase,
    startTime: newStartTime,
    endTime: newEndTime,
  };
};

import { Reducer, useCallback, useEffect, useMemo, useReducer } from 'react';
import { ActionItemType, ActionType, END, RESET, SETCURRENTINDEX, TYPINGDELETE, TYPINGINSERT } from './actions';

export enum EPhaseType {
  /**
   * Phase when typing has yet to start.
   */
  NotStarted = 0,
  /**
   * Phase when typing has started.
   */
  Started = 1,
  /**
   * Phase when typing has ended.
   */
  Ended = 2,
}

export enum ECharStateType {
  /**
   * Character has yet to be determined to be correct or incorrect.
   */
  Incomplete = 0,
  /**
   * Character is determined to be correct.
   */
  Correct = 1,
  /**
   * Character is determined to be incorrect.
   */
  Incorrect = 2,
}

export interface ITypingOptions {
  /**
   * Move on to the next word when space is inputted, defaults to `true`.
   */
  skipCurrentWordOnSpace: boolean;
  /**
   * Stay on the current index when the inputted character is wrong, defaults to `false`.
   */
  pauseOnError: boolean;
  /**
   * With `everytime`, choose to count errors everytime a mistake is made.
   * With `once`, choose to count errors only once for each mistake made.
   */
  countErrors: 'everytime' | 'once';
}

export interface ITypingStateType extends ITypingOptions {
  /**
   * The inputted string to be used.
   */
  chars: string;
  /**
   * Array of each character's state in the string.
   * Each item in the array represents the state of each character in the string.
   * `0` represents incomplete, `1` represents correct and, `2` represents incorrect.
   */
  charsState: ECharStateType[];
  /**
   * Length of the string used.
   */
  length: number;
  /**
   * Current index of the character the user have typed till.
   */
  currIndex: number;
  /**
   * Current character the user have typed till.
   */
  currChar: string;
  /**
   * Number of correct character the user had typed.
   */
  correctChar: number;
  /**
   * Number of incorrect character the user had typed.
   */
  errorChar: number;
  /**
   * Number of space chars the user had typed.
   */
  spaceChar: number;
  /**
   * Number of keystrokes the user had done.
   */
  keystrokes: number;
  /**
   * Represent the current state.
   * `0` typing haven't started, `1` typing started, `2` typing ended.
   */
  phase: EPhaseType;
  /**
   * Time in milliseconds when the typing started.
   */
  startTime: number | null;
  /**
   * Time in milliseconds when the typing ended.
   */
  endTime: number | null;
}

/**
 * Methods of the typing game hook.
 */
export interface ITypingActionType {
  /**
   * Duration in milliseconds since the typing started.
   * 0 if the typing has yet to start.
   * When the typing ended, the duration will be equivalent to endTime - startTime.
   */
  getDuration: () => number;
  /**
   * Reset the typing sequence.
   */
  resetTyping: () => void;
  /**
   * Ends the typing sequence but not reset it.
   */
  endTyping: () => void;
  /**
   * Insert a character into the current typing sequence.
   * @param {string | null} char A character to be inserted.
   * If falsy or no argument is supplied, skip the current character.
   */
  insertTyping: (char?: string) => void;
  /**
   * Delete a character from the current typing sequence.
   * @param {boolean} [deleteWord] If `true`, deletes the whole of the current word. Defaults to `false`.
   */
  deleteTyping: (deleteWord?: boolean) => void;
  /**
   * Set the current index manually.
   * @param {number} num Allows from -1 to length - 1 of the text, numbers that falls outside of the range will return a false.
   */
  setCurrIndex: (num: number) => boolean;
}

const reducer: Reducer<ITypingStateType, ActionItemType> = (state, action) => {
  switch (action.type) {
    case ActionType.SETCURRENTINDEX:
      return SETCURRENTINDEX(state, action);
    case ActionType.RESET:
      return RESET(state);
    case ActionType.END:
      return END(state);
    case ActionType.TYPINGINSERT:
      return TYPINGINSERT(state, action);
    case ActionType.TYPINGDELETE:
      return TYPINGDELETE(state, action);
    case ActionType._ONTEXTCHANGE:
      return action.payload;
    default: {
      return state;
    }
  }
};

export const useTypingGame = (
  text: string = '',
  options: Partial<ITypingOptions> = {}
): { states: ITypingStateType; actions: ITypingActionType } => {
  const initialState = useMemo<ITypingStateType>(
    () => ({
      startTime: null,
      endTime: null,
      chars: text,
      charsState: new Array(text.length).fill(0),
      length: text.length,
      currIndex: -1,
      currChar: '',
      correctChar: 0,
      errorChar: 0,
      spaceChar: 0,
      keystrokes: 0,
      phase: 0,
      skipCurrentWordOnSpace: true,
      pauseOnError: false,
      countErrors: 'everytime',
      ...options,
    }),
    [options, text]
  );

  const [states, dispatch] = useReducer<Reducer<ITypingStateType, ActionItemType>>(reducer, initialState);

  useEffect(() => {
    dispatch({
      type: ActionType._ONTEXTCHANGE,
      payload: initialState,
    });
  }, [text, dispatch]);

  const getDuration = useCallback<ITypingActionType['getDuration']>(() => {
    switch (states.phase) {
      case EPhaseType.NotStarted: {
        return 0;
      }
      case EPhaseType.Started: {
        return states.startTime ? new Date().getTime() - states.startTime : 0;
      }
      case EPhaseType.Ended: {
        return states.startTime && states.endTime ? states.endTime - states.startTime : 0;
      }
    }
  }, [states.phase, states.startTime, states.startTime]);

  const resetTyping = useCallback<ITypingActionType['resetTyping']>(
    () => dispatch({ type: ActionType.RESET }),
    [dispatch]
  );

  const endTyping = useCallback<ITypingActionType['endTyping']>(() => dispatch({ type: ActionType.END }), [dispatch]);

  const insertTyping = useCallback<ITypingActionType['insertTyping']>(
    (letter: string | undefined) => {
      const payload = letter ? letter[0] : '';
      dispatch({
        type: ActionType.TYPINGINSERT,
        payload,
      });
    },
    [dispatch]
  );

  const deleteTyping = useCallback<ITypingActionType['deleteTyping']>(
    (deleteWord = false) => {
      dispatch({
        type: ActionType.TYPINGDELETE,
        payload: deleteWord || false,
      });
    },
    [dispatch]
  );

  const setCurrIndex = useCallback<ITypingActionType['setCurrIndex']>(
    (num: number) => {
      if (num < -1 || num >= states.length || states.phase !== 2) {
        return false;
      }
      dispatch({
        type: ActionType.SETCURRENTINDEX,
        payload: num,
      });
      return true;
    },
    [dispatch, states.length, states.phase]
  );

  return {
    states,
    actions: {
      getDuration,
      resetTyping,
      endTyping,
      insertTyping,
      deleteTyping,
      setCurrIndex,
    },
  };
};

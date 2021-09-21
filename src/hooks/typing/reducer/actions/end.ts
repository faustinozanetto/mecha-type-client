import { TypingStateType } from '../TypeReducer';

export const end = (state: TypingStateType): TypingStateType => {

  return {
    ...state,
    phase: 2,
    endTime: new Date().getTime(),
  };
};

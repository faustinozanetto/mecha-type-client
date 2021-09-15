import { TypingStateType } from '../TypeReducer';

export const end = (state: TypingStateType): TypingStateType => {
  console.log('END');
  return {
    ...state,
    phase: 2,
    endTime: new Date().getTime(),
  };
};

import { ActionItemType } from '.';
import { TypingStateType } from '../TypeReducer';

export const setCurrentIndex = (state: TypingStateType, action: ActionItemType): TypingStateType => {
  let { chars, length } = state;
  let payload = action.payload ?? null;
  if (payload && typeof payload === 'number' && payload >= -1 && payload < length) {
    return { ...state, currIndex: payload, currChar: chars[payload] };
  } else {
    return state;
  }
};

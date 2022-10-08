import { ActionItemType } from '.';
import { ITypingStateType } from '../use-typing-game';

export default (state: ITypingStateType, action: ActionItemType): ITypingStateType => {
  let { chars, length } = state;
  let payload = action.payload ?? null;
  if (payload && typeof payload === 'number' && payload >= -1 && payload < length) {
    return { ...state, currIndex: payload, currChar: chars[payload] ?? '' };
  } else {
    return state;
  }
};

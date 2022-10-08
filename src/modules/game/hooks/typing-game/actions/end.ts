import type { ITypingStateType } from '../use-typing-game';

export default (state: ITypingStateType): ITypingStateType => ({
  ...state,
  phase: 2,
  endTime: new Date().getTime(),
});

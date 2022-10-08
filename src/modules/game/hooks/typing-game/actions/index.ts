import { ITypingStateType } from '../use-typing-game';

export enum ActionType {
  _ONTEXTCHANGE = 'INTERNAL/ONTEXTCHANGE',
  RESET = 'RESET',
  END = 'END',
  TYPINGINSERT = 'TYPING/INSERT',
  TYPINGDELETE = 'TYPING/DELETE',
  SETCURRENTINDEX = 'SET/CURRENTINDEX',
}

export type ActionItemType =
  | { type: ActionType.RESET; payload?: undefined }
  | { type: ActionType.END; payload?: undefined }
  | { type: ActionType.TYPINGDELETE; payload: boolean }
  | { type: ActionType.TYPINGINSERT; payload: string | null }
  | { type: ActionType.SETCURRENTINDEX; payload: number }
  | { type: ActionType._ONTEXTCHANGE; payload: ITypingStateType };

export { default as RESET } from './reset';
export { default as SETCURRENTINDEX } from './set-current-index';
export { default as END } from './end';
export { default as TYPINGINSERT } from './typing-insert';
export { default as TYPINGDELETE } from './typing-delete';

export enum ActionType {
  WPM = 'WPM',
}

export type ActionItemType = { type: ActionType.WPM; payload?: undefined };

export { wpm as WPM } from './wpm';

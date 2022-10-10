import { ActionMap } from '@typedefs/mecha-types';

export type Preferences = {
  accentColors: string;
  pauseOnErrors: boolean;
};

export enum ActionType {
  SET_ACCENT_COLORS,
  SET_PAUSE_ON_ERRORS,
}

type PreferencesPayload = {
  [ActionType.SET_ACCENT_COLORS]: {
    accentColors: string;
  };
  [ActionType.SET_PAUSE_ON_ERRORS]: {
    pauseOnErrors: boolean;
  };
};

export type PreferencesActions = ActionMap<PreferencesPayload>[keyof ActionMap<PreferencesPayload>];

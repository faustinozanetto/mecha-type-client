import type { ActionMap } from '@typedefs/mecha-types';

export type Preferences = {
  menuOpen: boolean;
  accentColors: string;
  pauseOnErrors: boolean;
};

export enum ActionType {
  SET_PREFERENCES_MENU_OPEN,
  SET_ACCENT_COLORS,
  SET_PAUSE_ON_ERRORS,
}

type PreferencesPayload = {
  [ActionType.SET_PREFERENCES_MENU_OPEN]: {
    open: boolean;
  };
  [ActionType.SET_ACCENT_COLORS]: {
    accentColors: string;
  };
  [ActionType.SET_PAUSE_ON_ERRORS]: {
    pauseOnErrors: boolean;
  };
};

export type PreferencesActions = ActionMap<PreferencesPayload>[keyof ActionMap<PreferencesPayload>];

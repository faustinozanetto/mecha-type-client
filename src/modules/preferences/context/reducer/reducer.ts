import { ActionType, Preferences, PreferencesActions } from './types';

const reducer = (state: Preferences, action: PreferencesActions): Preferences => {
  switch (action.type) {
    case ActionType.SET_ACCENT_COLORS: {
      return {
        ...state,
        accentColors: action.payload.accentColors,
      };
    }
    case ActionType.SET_PAUSE_ON_ERRORS: {
      return {
        ...state,
        pauseOnErrors: action.payload.pauseOnErrors,
      };
    }
    default:
      throw new Error('Unknown action type');
  }
};

export default reducer;

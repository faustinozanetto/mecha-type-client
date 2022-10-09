import { Action, Preferences } from './types';

const reducer = (state: Preferences, action: Action): Preferences => {
  switch (action.type) {
    case 'SET_ACCENT_COLORS': {
      return {
        ...state,
        accentColors: action.payload,
      };
    }
    default:
      throw new Error('Unknown action type');
  }
};

export default reducer;

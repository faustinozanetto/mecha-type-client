import { createContext, useContext, useReducer } from 'react';

interface Preferences {
  accentColors: string;
}

interface IPreferencesContextProps {
  state: Preferences;
  dispatch: React.Dispatch<Action>;
}

export type Action = { type: 'SET_ACCENT_COLORS'; payload: string };

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

const PreferencesContext = createContext<IPreferencesContextProps>({} as IPreferencesContextProps);

interface IPreferencesProviderProps {
  children: React.ReactNode;
}

const PreferencesProvider: React.FC<IPreferencesProviderProps> = (props) => {
  const { children } = props;

  const [state, dispatch] = useReducer(reducer, {
    accentColors: 'vintage',
  });

  return <PreferencesContext.Provider value={{ state, dispatch }}>{children}</PreferencesContext.Provider>;
};

export const usePreferencesContext = () => {
  return useContext<IPreferencesContextProps>(PreferencesContext);
};

export default PreferencesProvider;

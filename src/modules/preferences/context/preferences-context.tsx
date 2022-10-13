import { createContext, useContext, useEffect, useReducer } from 'react';

import reducer from './reducer/reducer';
import { ActionType, Preferences, PreferencesActions } from './reducer/types';

interface IPreferencesContextProps {
  /** State of the preferences context */
  state: Preferences;
  /** Dispatch function to modify state via actions. */
  dispatch: React.Dispatch<PreferencesActions>;
}

const PreferencesContext = createContext<IPreferencesContextProps>({} as IPreferencesContextProps);

interface IPreferencesProviderProps {
  children: React.ReactNode;
}

const PreferencesProvider: React.FC<IPreferencesProviderProps> = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, {
    accentColors: 'blueberry',
    pauseOnErrors: false,
    menuOpen: false,
  });

  // Initialize state from local storage
  useEffect(() => {
    if (typeof window !== undefined) {
      const accentColors = window.localStorage.getItem('accentColors');
      if (accentColors)
        dispatch({
          type: ActionType.SET_ACCENT_COLORS,
          payload: {
            accentColors,
          },
        });
    }
  }, []);

  return <PreferencesContext.Provider value={{ state, dispatch }}>{children}</PreferencesContext.Provider>;
};

export const usePreferencesContext = () => {
  return useContext<IPreferencesContextProps>(PreferencesContext);
};

export default PreferencesProvider;

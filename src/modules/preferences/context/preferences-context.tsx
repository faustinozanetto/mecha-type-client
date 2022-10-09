import { createContext, useContext, useReducer } from 'react';
import reducer from './reducer/reducer';
import { Preferences, Action } from './reducer/types';

interface IPreferencesContextProps {
  state: Preferences;
  dispatch: React.Dispatch<Action>;
}

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

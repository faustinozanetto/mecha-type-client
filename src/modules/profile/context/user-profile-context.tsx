import { User } from '@prisma/client';
import { createContext, useReducer, useContext } from 'react';
import reducer from './reducer/reducer';
import { UserProfile, UserProfileActions } from './reducer/types';

interface IUserProfileContextProps {
  /** State of the user profile context */
  state: UserProfile;
  /** Dispatch function to modify state via actions. */
  dispatch: React.Dispatch<UserProfileActions>;
}

const UserProfileContext = createContext<IUserProfileContextProps>({} as IUserProfileContextProps);

interface IUserProfileProviderProps {
  children: React.ReactNode;
}

const UserProfileProvider: React.FC<IUserProfileProviderProps> = (props) => {
  const { children } = props;
  const [state, dispatch] = useReducer(reducer, {
    user: {} as User,
    userLoading: false,
  });

  return <UserProfileContext.Provider value={{ state, dispatch }}>{children}</UserProfileContext.Provider>;
};

export const useUserProfileContext = () => {
  return useContext<IUserProfileContextProps>(UserProfileContext);
};

export default UserProfileProvider;

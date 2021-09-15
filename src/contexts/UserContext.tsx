import { User } from '@generated/graphql';
import React, { createContext, useCallback, useContext, useState } from 'react';

type SidebarContextType = {
  user: User | undefined;
  setUser: (user: User) => void;
};

export const UserContext = createContext<SidebarContextType>({
  user: undefined,
  setUser: () => {},
});

const UserProvider: React.FC = ({ children }) => {
  const [user, setNewUser] = useState<User>();

  return <UserContext.Provider value={{ user, setUser: setNewUser }}>{children}</UserContext.Provider>;
};

export const useUserContext = () => useContext(UserContext);

export default UserProvider;

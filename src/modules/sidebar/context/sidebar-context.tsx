import { createContext, useCallback, useContext, useMemo, useState } from 'react';

interface ISidebarContextProps {
  isCollapsed: boolean;
  toggle: () => void;
}
const initialState: ISidebarContextProps = {
  isCollapsed: false,
  toggle: () => {},
};

const SidebarContext = createContext<ISidebarContextProps>(initialState);

interface ISidebarProviderProps {
  children: React.ReactNode;
}

const SidebarProvider: React.FC<ISidebarProviderProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState<boolean>(initialState.isCollapsed);

  const isCollapsed = useMemo(() => {
    return collapsed;
  }, [collapsed]);

  const toggle = useCallback(() => {
    setCollapsed((prev) => !prev);
  }, []);

  return <SidebarContext.Provider value={{ isCollapsed, toggle }}>{children}</SidebarContext.Provider>;
};

export const useSidebarContext = () => {
  return useContext<ISidebarContextProps>(SidebarContext);
};

export default SidebarProvider;

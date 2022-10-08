import { createContext, useCallback, useContext, useMemo, useState } from 'react';

interface ISidebarContextProps {
  isCollapsed: boolean;
  toggle: () => void;
  setIsCollapsed: (newCollapsed: boolean) => void;
}
const initialState: ISidebarContextProps = {
  isCollapsed: false,
  toggle: () => {},
  setIsCollapsed: (_: boolean) => {},
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

  const changeCollapsed = useCallback((newCollapsed: boolean) => {
    setCollapsed(newCollapsed);
  }, []);

  const memoizedValue = useMemo<ISidebarContextProps>(
    () => ({
      isCollapsed,
      toggle,
      setIsCollapsed: changeCollapsed,
    }),
    [isCollapsed, toggle, changeCollapsed]
  );

  return <SidebarContext.Provider value={memoizedValue}>{children}</SidebarContext.Provider>;
};

export const useSidebarContext = () => {
  return useContext<ISidebarContextProps>(SidebarContext);
};

export default SidebarProvider;

import React, { useCallback, useContext, useState } from 'react';
import { TestPreset } from 'generated/graphql';

type TypingGameContextTypes = {
  hideCursor: boolean;
  setHideCursor: (newHideCursor: boolean) => void;
};

const contextDefaultValues: TypingGameContextTypes = {
  hideCursor: false,
  setHideCursor: () => {},
};

export const TypingGameContext = React.createContext<TypingGameContextTypes>(contextDefaultValues);

const TypingGameProvider: React.FC = ({ children }) => {
  const [shouldHideCursor, setShouldHideCursor] = useState<boolean>(false);

  const setHideCursor = useCallback((newHideCursor: boolean) => {
    setShouldHideCursor(newHideCursor);
  }, []);

  return (
    <TypingGameContext.Provider value={{ hideCursor: shouldHideCursor, setHideCursor }}>
      {children}
    </TypingGameContext.Provider>
  );
};

export const useTypingGameContext = () => useContext(TypingGameContext);

export default TypingGameProvider;

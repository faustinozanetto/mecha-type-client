import React, { useCallback, useContext, useState } from "react";
import { TestPreset } from "generated/graphql";

type MechaContextTypes = {
  currentTestPreset: TestPreset | undefined;
  setCurrentTestPreset: (newPreset: TestPreset | undefined) => void;
};

const contextDefaultValues: MechaContextTypes = {
  currentTestPreset: undefined,
  setCurrentTestPreset: () => {},
};

export const MechaContext = React.createContext<MechaContextTypes>(contextDefaultValues);

const MechaProvider: React.FC = ({ children }) => {
  const [testPreset, setTestPreset] = useState<TestPreset>();

  const setCurrentTestPreset = useCallback((newPreset: TestPreset | undefined) => {
    setTestPreset(newPreset);
  }, []);

  return (
    <MechaContext.Provider value={{ currentTestPreset: testPreset, setCurrentTestPreset }}>
      {children}
    </MechaContext.Provider>
  );
};

export const useMechaContext = () => useContext(MechaContext);

export default MechaProvider;

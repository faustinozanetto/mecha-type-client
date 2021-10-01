import {
  getPracticeConfig,
  PracticeConfig,
  updatePracticeConfig,
} from '@modules/core/practice/practice-config-manager';
import create from 'zustand';
import { devtools } from 'zustand/middleware';

interface MechaStore {
  practiceConfig: PracticeConfig;
  setPracticeConfig: (config: PracticeConfig) => void;
}

const useMechaStore = create<MechaStore>(
  devtools((set, get) => ({
    practiceConfig: getPracticeConfig(),
    setPracticeConfig: (config) =>
      set(() => {
        updatePracticeConfig(config);
        return { practiceConfig: config };
      }),
  }))
);

export default useMechaStore;

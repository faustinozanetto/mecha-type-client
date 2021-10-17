import { TestPresetFragment } from '@generated/graphql';
import {
  getPracticeConfig,
  PracticeConfig,
  updatePracticeConfig,
} from '@modules/core/practice/practice-config-manager';
import create from 'zustand';

interface MechaStore {
  practiceConfig: PracticeConfig;
  setPracticeConfig: (config: PracticeConfig) => void;
  searchedTestPresets: TestPresetFragment[];
  setSearchedTestPresets: (testsPresets: TestPresetFragment[]) => void;
}

const useMechaStore = create<MechaStore>((set) => ({
  practiceConfig: getPracticeConfig(),
  setPracticeConfig: (config) => updatePracticeConfig(config),
  searchedTestPresets: [],
  setSearchedTestPresets(presets) {
    set(() => ({
      searchedTestPresets: presets,
    }));
  },
}));

export default useMechaStore;

import React from 'react';

export type PracticeConfig = {
  punctuateWords: boolean;
  blindMode: boolean;
  pauseOnError: boolean;
  noBackspace: boolean;
  typeSounds: boolean;
  typeSoundsVolume: number;
};

const useLocalStorageState = (defaultValue, key) => {
  const [value, setValue] = React.useState(defaultValue);

  React.useEffect(() => {
    const stickyValue = window.localStorage.getItem(key);

    if (stickyValue !== null) {
      setValue(JSON.parse(stickyValue));
    }
  }, [key]);

  React.useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};

export const getPracticeConfig = (): PracticeConfig => {
  if (typeof window !== 'undefined') {
    const config = window.localStorage.getItem('practice-config');
    if (config !== null) {
      return JSON.parse(config);
    } else {
      return {
        blindMode: false,
        typeSoundsVolume: 1.0,
        typeSounds: true,
        punctuateWords: true,
        pauseOnError: false,
        noBackspace: false,
      };
    }
  }
};

export const updatePracticeConfig = (updatedConfig: PracticeConfig) => {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem('practice-config', JSON.stringify(updatedConfig));
  }
};

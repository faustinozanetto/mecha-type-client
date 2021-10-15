import { SoundCategory, SoundType } from './types/sound.types';

export const typeSounds: SoundType[] = [
  {
    category: SoundCategory.TYPE,
    volume: 2.25,
    filePath: '/sounds/type/click4_1.wav',
  },
  {
    category: SoundCategory.TYPE,
    volume: 2.25,
    filePath: '/sounds/type/click4_2.wav',
  },
  {
    category: SoundCategory.TYPE,
    volume: 2.25,
    filePath: '/sounds/type/click4_3.wav',
  },
  {
    category: SoundCategory.TYPE,
    volume: 2.25,
    filePath: '/sounds/type/click4_4.wav',
  },
  {
    category: SoundCategory.TYPE,
    volume: 2.25,
    filePath: '/sounds/type/click4_5.wav',
  },
  {
    category: SoundCategory.TYPE,
    volume: 2.25,
    filePath: '/sounds/type/click4_6.wav',
  },
  {
    category: SoundCategory.TYPE,
    volume: 2.25,
    filePath: '/sounds/type/click4_7.wav',
  },
  {
    category: SoundCategory.TYPE,
    volume: 2.25,
    filePath: '/sounds/type/click4_8.wav',
  },
  {
    category: SoundCategory.TYPE,
    volume: 2.25,
    filePath: '/sounds/type/click4_9.wav',
  },
  {
    category: SoundCategory.TYPE,
    volume: 2.25,
    filePath: '/sounds/type/click4_10.wav',
  },
];

export const selectRandomTypeSound = (): SoundType => {
  const random = Math.floor(Math.random() * typeSounds.length);
  return typeSounds[random];
};

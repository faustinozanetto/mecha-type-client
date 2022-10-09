export interface Preferences {
  accentColors: string;
}

export type Action = { type: 'SET_ACCENT_COLORS'; payload: string };

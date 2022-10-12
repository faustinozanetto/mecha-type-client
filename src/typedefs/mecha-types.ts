/*= ================= Reducers ================== */
export type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

/*= ================ User ================= */
export enum EUserStatType {
  KEYSTROKES = 'Keystrokes',
  AVERAGE_WPM = 'Average WPM',
  AVERAGE_CPM = 'Average CPM',
  TESTS_COMPLETED = 'Tests Completed',
}

export type UserStats = Map<EUserStatType, string>;

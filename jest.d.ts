import 'jest-extended';

declare global {
  namespace NodeJS {
    interface Global {
      muteConsole: () => any;
      unmuteConsole: () => any;
    }
  }
}

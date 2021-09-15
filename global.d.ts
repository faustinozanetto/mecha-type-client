import '@testing-library/jest-dom/extend-expect';
declare namespace Process {
  interface ProcessEnv {
    PROXY_MODE: string;
    NEXT_PUBLIC_STATIC_PATH: string;
    NEXT_PUBLIC_API_URL: string;
    NEXT_PUBLIC_API_KEY: string;
  }
}

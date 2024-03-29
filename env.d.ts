declare namespace NodeJS {
  export interface ProcessEnv {
    PORT: number;
    BUILD_VERSION: string;
    HOST: string;
    ANALYZE: boolean;
    BACKEND_URL: string;
    PRODUCTION_URL: string;
    GOOGLE_ANALYTICS_ID: string;
  }
}

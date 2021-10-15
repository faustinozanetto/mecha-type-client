declare namespace NodeJS {
  export interface ProcessEnv {
    ANALYZE: boolean;
    BACKEND_URL: string;
    PRODUCTION_URL: string;
    GOOGLE_ANALYTICS_ID: string;
  }
}

declare namespace NodeJS {
  export interface ProcessEnv {
    PORT: number;
    BUILD_VERSION: string;
    HOST: string;
    DISCORD_CLIENT_ID: string;
    DISCORD_CLIENT_SECRET: string;
    AUTH_SECRET: string;
  }
}

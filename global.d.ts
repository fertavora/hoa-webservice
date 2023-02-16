namespace NodeJS {
  interface ProcessEnv {
    API_PORT: number;
    API_HOST: string;
    JWT_SECRET: string;
    DB_HOST: string;
    DB_USER: string;
    DB_PASSWORD: string;
    DB_NAME: string;
  }
}
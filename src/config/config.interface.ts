export interface EnvConfig {
  // APP
  APP_PORT: string;
  // JWT AUTH
  JWT_SECRET_KEY: string;
  JWT_EXPIRATION_TIME: string;
  // DATABASE;
  DB_TYPE: string;
  DB_USERNAME: string;
  DB_PASSWORD: string;
  DB_HOST: string;
  DB_PORT: string;
  DB_DATABASE: string;
}

export interface ConfigModuleOptions {
  [key: string]: string;
}

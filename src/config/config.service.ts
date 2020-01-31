import * as path from 'path';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import { EnvConfig } from './config.interface';

export class ConfigService {
  private readonly envConfig: { [key: string]: string };

  constructor() {
    const baseEnvFile = path.resolve(__dirname, '../../', '.env');
    this.envConfig = dotenv.parse(fs.readFileSync(baseEnvFile));

    const filePath = `.env.${process.env.NODE_ENV || 'development'}`;
    const envFile = path.resolve(__dirname, '../../', filePath);
    this.envConfig = Object.assign(
      {},
      this.envConfig,
      dotenv.parse(fs.readFileSync(envFile)),
    );
  }

  get(key: keyof EnvConfig): string {
    return this.envConfig[key];
  }
}

import * as Joi from 'joi';

import * as dotenv from 'dotenv';

import {
  Injectable,
} from '@nestjs/common';

import * as config from 'config';

import {
  envConfig as envSchema,
} from './../schemas/';

import {
  IEnvConfig,
  IConfig,
  IConfigRegistry,
  IConfigService,
} from './config.service.interface';

// TODO: refactor this peace of shit

@Injectable()
export class ConfigService implements IConfigService {
  private config: IConfigRegistry;

  private envConfig: IEnvConfig;
  // private appConfig: IConfig;

  constructor() {
    const env = dotenv.config();
    // const app = config; // NOTE: THIS IS SHIT

    this.envConfig = <IEnvConfig> this.validateInput(env.parsed, envSchema);
    // this.appConfig = <IConfig> this.validateInput(app.util.toObject(), appSchema);

    this.config = config;

    console.log(JSON.stringify({
      service: 'configService',
      call: 'INIT',
    }));
  }

  private validateInput(config: IConfig, schema: Joi.ObjectSchema): IConfig {
    const { error, value: validConfig } = Joi.validate(
      config,
      schema,
    );

    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }
    return validConfig;
  }

  public getConfig(): IConfigRegistry {
    return this.config;
  }

  public async getConfigAsync(): Promise<IConfigRegistry> {
    return this.config;
  }

  public index(): IConfig {
    return this.envConfig;
  }

  public get(): any {
    return this.envConfig;
  }

  public async getAsync(key: string): Promise<any> {
    return this.config.get(key);
  }

  public set(key: string, value: any): any {
    return this.envConfig[key] = value;
  }

  public async setAsync(key: string, value: any): Promise<void> {
    return this.envConfig[key] = value;
  }

}

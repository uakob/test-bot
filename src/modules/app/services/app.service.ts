import { Injectable, Inject } from '@nestjs/common';

import {
  COMMON_DI_CONSTANTS,
  IConfigService,
  IConfig,
  ILogger,
} from './../../../common';

import { DI_CONSTANTS } from './../../../di_constants';

import { IAppService } from './app.service.interface';

@Injectable()
export class AppService implements IAppService {
  private config: IConfig;
  private logger: ILogger;

  constructor(
    @Inject(COMMON_DI_CONSTANTS.IConfig)
    config: IConfig,
    @Inject(COMMON_DI_CONSTANTS.ILogger)
    logger: ILogger,
  ) {
    this.config = config;
    this.logger = logger;
  }

  public async init(): Promise<void> {
    this.logger.log('info', 'APP INIT');

    return;
  }
}

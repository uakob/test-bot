import {
  Injectable,
  Inject,
} from '@nestjs/common';

import * as winston from 'winston';

import {
  COMMON_DI_CONSTANTS,
} from './../../../common_di_constants';

import {
  IConfig,
  IConfigRegistry,
} from './../../config';

import {
  ILoggerService,
  ILogger,
} from './logger.service.interface';

@Injectable()
export class LoggerService implements ILoggerService {
  // TODO: winston settings to config
  // NOTE: ??? loggerService => loggers fabric
  private readonly config: IConfig;
  private readonly logger: ILogger;

  constructor(
    @Inject(COMMON_DI_CONSTANTS.IConfig)
    config: IConfigRegistry,
  ) {
    this.config = config.get('logger');
  }

  public create(): ILogger {
    return winston.createLogger({
      level: <string> this.config.level,
      format: winston.format.json(),
      defaultMeta: { service: 'autobot' },
      transports: [
        new winston.transports.Console(),
      ],
    });
  }
}

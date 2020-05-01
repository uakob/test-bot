import {
  Inject,
  Injectable,
} from '@nestjs/common';

import * as Joi from 'joi';

import {
  COMMON_DI_CONSTANTS,
  IConfig,
  IConfigRegistry,
  ILogger,
} from './../../..';

import {
  IValidationService,
} from './validation.service.interface';

@Injectable()
export class ValidationService implements IValidationService {
  private readonly config: IConfig;
  private readonly logger: ILogger;

  constructor(
    @Inject(COMMON_DI_CONSTANTS.IConfig)
    config: IConfigRegistry,
    @Inject(COMMON_DI_CONSTANTS.ILogger)
    logger: ILogger,
  ) {

    this.config = config.get('validation');
    this.logger = logger;
  }

  public async validate<T>(input: T, schema: Object): Promise<T> {
    if (!Joi.validate(input, schema)) {
      this.logger.error('validation error');

      throw new Error();
    }

    return input;
  }
}

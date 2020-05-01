import {
  Module,
  Global,
} from '@nestjs/common';

// import {
//   APP_PIPE,
// } from '@nestjs/core';

import {
  COMMON_DI_CONSTANTS,
} from './../../common_di_constants';

import {
  LoggerModule,
} from './../logger';
import {
  IConfigRegistry,
} from './../config';

import {
  ValidationService,
  ValidationPipe,
  JoiValidationPipe,
} from './services';

@Global()
@Module({
  imports: [
    LoggerModule,
  ],
  providers: [
    {
      provide: COMMON_DI_CONSTANTS.IValidationService,
      useClass: ValidationService,
    },
    {
      provide: COMMON_DI_CONSTANTS.IValidationPipe,
      useFactory: (config: IConfigRegistry) => {
        const validator = config.get('validation').validator;

        if (validator === 'schema') {
          return JoiValidationPipe;
        }

        if (validator === 'object') {
          return ValidationPipe;
        }
      },
      inject: [
        COMMON_DI_CONSTANTS.IConfig,
        COMMON_DI_CONSTANTS.ILogger,
      ],
    },
  ],
  exports: [
    COMMON_DI_CONSTANTS.IValidationService,
    COMMON_DI_CONSTANTS.IValidationPipe,
    // APP_PIPE,
  ],
})
export class ValidationModule {}

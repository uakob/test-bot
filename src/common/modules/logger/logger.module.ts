import {
  Module,
  Global,
} from '@nestjs/common';

import {
  COMMON_DI_CONSTANTS,
} from './../../common_di_constants';

import {
  ConfigModule,
} from './../config';

import {
  ILoggerService,
  LoggerService,
  ILogger,
} from './services';

@Global()
@Module({
  imports: [
    ConfigModule,
  ],
  providers: [
    {
      provide: COMMON_DI_CONSTANTS.ILoggerService,
      useClass: LoggerService,
    },
    {
      provide: COMMON_DI_CONSTANTS.ILogger,
      useFactory: (loggerService: ILoggerService) => {
        return loggerService.create();
      },
      inject: [COMMON_DI_CONSTANTS.ILoggerService],
    },
  ],
  exports: [
    COMMON_DI_CONSTANTS.ILogger,
    COMMON_DI_CONSTANTS.ILoggerService,
  ],
})
export class LoggerModule {}

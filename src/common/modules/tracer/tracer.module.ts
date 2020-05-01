import {
  Module,
  Global,
  Scope,
} from '@nestjs/common';

import {
  COMMON_DI_CONSTANTS,
} from './../../common_di_constants';

import {
  LoggerModule,
  ILogger,
} from './../logger';

import {
  IConfigRegistry,
} from './../config';

import {
  TracerInterceptor,
} from './interceptors';
import {
  ITracerService,
  TracerService,
  ITracer,
} from './services';

@Global()
@Module({
  imports: [
    LoggerModule,
  ],
  providers: [
    {
      provide: COMMON_DI_CONSTANTS.ITracerService,
      useClass: TracerService,
    },
    {
      provide: COMMON_DI_CONSTANTS.ITracer,
      useFactory: (tracerService: ITracerService) => {
        return tracerService.getTracer();
      },
      inject: [COMMON_DI_CONSTANTS.ITracerService],
    },
    // {
    //   provide: DI_CONSTANTS.ISpan,
    //   useFactory: (tracer: ITracer) => {
    //     // const args = Object.keys(req);
    //     return tracer.startSpan('TEST'); // NOTE: how we can achieve right parameters
    //   },
    //   inject: [DI_CONSTANTS.ITracer],
    //   scope: Scope.REQUEST,
    // },
    {
      provide: COMMON_DI_CONSTANTS.ITracerInterceptor,
      useFactory: (
        config: IConfigRegistry,
        logger: ILogger,
        tracer: ITracer,
      ) => {
        return new TracerInterceptor(
          config,
          logger,
          tracer,
        );
      },
      inject: [
        COMMON_DI_CONSTANTS.IConfigService,
        COMMON_DI_CONSTANTS.ILogger,
        COMMON_DI_CONSTANTS.ITracer,
      ],
    },
  ],
  exports: [
    COMMON_DI_CONSTANTS.ITracerService,
    COMMON_DI_CONSTANTS.ITracer,
    // COMMON_DI_CONSTANTS.ISpan,
    COMMON_DI_CONSTANTS.ITracerInterceptor,
  ],
})
export class TracerModule {}

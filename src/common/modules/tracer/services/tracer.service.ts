// import {
//   Span,
//   Tags,
// } from 'opentracing';

import {
  initTracer,
  TracingConfig,
  TracingOptions,
} from 'jaeger-client';

import {
  Injectable,
  Inject,
} from '@nestjs/common';

import {
  COMMON_DI_CONSTANTS,
} from './../../../common_di_constants';

import {
  IConfig,
  IConfigRegistry,
} from './../../config';

import {
  ILogger,
} from './../../logger';

import {
  ITracerService,
  ITracer,
} from './tracer.service.interface';

@Injectable()
export class TracerService implements ITracerService {
  // TODO: winston settings to config
  // NOTE: ??? loggerService => loggers fabric
  private readonly config: IConfig;
  private readonly logger: ILogger;

  private readonly tracer: ITracer;

  constructor(
    @Inject(COMMON_DI_CONSTANTS.IConfig)
    config: IConfigRegistry,
    @Inject(COMMON_DI_CONSTANTS.ILogger)
    logger: ILogger,
  ) {
    this.config = config.get('tracer');

    this.logger = logger;
    this.logger.log('info', 'JAEGER_CONFIG', this.config.jaeger);

    this.tracer = this.createTracer();
  }

  private createTracer(): ITracer {
    return initTracer(
      <TracingConfig> this.config.jaeger,
      <TracingOptions> { logger: this.logger },
    );
  }

  public getTracer(): ITracer {
    return this.tracer;
  }

  // public closeSpan = (error: Error, span: Span) => {
  //   span.setTag(Tags.ERROR, true);
  //   span.log({ error });
  //   span.finish();
  // }
}

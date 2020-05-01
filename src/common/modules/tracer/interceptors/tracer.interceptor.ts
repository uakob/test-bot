import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Inject,
  BadGatewayException,
} from '@nestjs/common';

import {
  Observable,
  throwError,
} from 'rxjs';
import {
  tap,
  catchError,
} from 'rxjs/operators';

import {
  Tags,
} from 'opentracing';

import {
  COMMON_DI_CONSTANTS,
} from './../../../common_di_constants';

import {
  IConfigRegistry,
  IConfig,
} from './../../config';

import {
  ILogger,
} from './../../logger/';

import {
  ITracer,
  ISpan,
} from './../services';

// import {
//   FastifyRequest,
// } from 'fastify';

@Injectable()
export class TracerInterceptor implements NestInterceptor {
  private readonly config: IConfig;

  private readonly logger: ILogger;
  private readonly tracer: ITracer;

  private span: ISpan;

  constructor(
    @Inject(COMMON_DI_CONSTANTS.IConfig)
    config: IConfigRegistry,
    @Inject(COMMON_DI_CONSTANTS.ILogger)
    logger: ILogger,
    @Inject(COMMON_DI_CONSTANTS.ITracer)
    tracer: ITracer,
    // @Inject(COMMON_DI_CONSTANTS.ISpan)
    // span: ISpan,
  ) {
    this.tracer = tracer;
    this.config = config.get('tracer');
    this.logger = logger;

    this.logger.info(`${ COMMON_DI_CONSTANTS.ITracer.toString() } INTERCEPTOR READY`);
    // this.span = span;
  }
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    this.logger.info('INTERCEPTOR: CALL');

    const ctx = context.switchToHttp();
    const req = ctx.getRequest();
    const raw = req.raw;

    this.span = this.tracer.startSpan(
      'AUTOBOT',
      {
        tags: {
          [Tags.SPAN_KIND]: Tags.SPAN_KIND_RPC_SERVER,
          [Tags.HTTP_METHOD]: raw.method,
          [Tags.HTTP_URL]: raw.url,
        },
      });

    this.span.log({
      body: req.body,
    });

    return next
      .handle()
      .pipe(
        catchError((err) => {
          this.logger.error('INTERCEPTOR ERROR', err);

          this.span.setTag(Tags.ERROR, true);
          this.span.setTag(Tags.HTTP_STATUS_CODE, 200);

          this.span.log({
            stack: err.stack,
            message: err.message,
          });

          this.span.finish();

          return throwError(new BadGatewayException());
        }),
      )
      .pipe(
        tap(() => {
          this.span.finish();
        }),
      );
  }
}

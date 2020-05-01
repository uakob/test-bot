import {
  Controller,
  Get,
  Inject,
  Param,
  BadGatewayException,
  Post,
  Patch,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

// import {
//   APP_PIPE,
// } from '@nestjs/core';

import {
  COMMON_DI_CONSTANTS,
  ILogger,
  ILoggerService,
  ITracer,
  ISpan,
} from './../../../common';

import {
  DI_CONSTANTS,
} from './../../../di_constants';

import {
  IAppService,
} from './../services';

@UsePipes(ValidationPipe)
@Controller('api/market/v1/autobotService/app')
export class AppController {
  private readonly appService: IAppService;
  private readonly logger: ILogger;

  private readonly tracer: ITracer;
  // private readonly span: ISpan;

  constructor(
    @Inject(DI_CONSTANTS.IAppService)
    appService: IAppService,
    @Inject(COMMON_DI_CONSTANTS.ILogger)
    logger: ILogger,
    @Inject(COMMON_DI_CONSTANTS.ITracer)
    tracer: ITracer,
  ) {

    this.appService = appService;

    this.logger = logger;
    this.tracer = tracer;
    // this.span = span;

    this
      .logger
      .info(`${DI_CONSTANTS.IAppService.toString()} CONTROLLER READY`);
  }

  @Post('/healthcheck')
  public async healthcheckPost() {
    return {
      success: 1,
      data: 'Good morning and welcome to the Black Mesa Transit System',
    };
  }

  @Get('/healthcheck')
  public async healthcheckGet() {
    return {
      success: 1,
      data: 'Good morning and welcome to the Black Mesa Transit System',
    };
  }
}

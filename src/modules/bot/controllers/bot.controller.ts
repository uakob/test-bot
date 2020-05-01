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

import * as _ from 'lodash';

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
  IBotService,
} from './../services';

import {
  IBot,
} from './../models/';

import {
  TestDto,
} from '../dto';

@UsePipes(ValidationPipe)
@Controller('api/market/v1/autobotService/bot')
export class BotController {
  private readonly botService: IBotService;
  private readonly logger: ILogger;

  private readonly tracer: ITracer;
  // private readonly span: ISpan;

  constructor(
    @Inject(DI_CONSTANTS.IBotService)
    botService: IBotService,
    @Inject(COMMON_DI_CONSTANTS.ILogger)
    logger: ILogger,
    @Inject(COMMON_DI_CONSTANTS.ITracer)
    tracer: ITracer,
    // @Inject(COMMON_DI_CONSTANTS.ISpan)
    // span: ISpan,
  ) {

    this.botService = botService;

    this.logger = logger;
    this.tracer = tracer;
    // this.span = span;

    this
      .logger
      .info(`${DI_CONSTANTS.IBotService.toString()} CONTROLLER READY`);
  }

  @Post('/test')
  public async test(
    @Body() testDto: TestDto,
  ) {
    return `your answer is ${testDto.answer}`;
  }

  @Get()
  public async index(): Promise<IBot[] | any> {
    // throw new BadGatewayException();
    // return 'hello';
    return this.botService.index();
  }

  @Get('/:name')
  public async get(
    @Param('name') name: string,
  ): Promise<IBot> {
    return this.botService.get(name);
  }

  @Post('/start')
  public async startTestBot(): Promise<void> {
    const bot = await this.botService.create();
    await bot.start();

    return;
  }

  @Post('/stop')
  public async stopTestBot(): Promise<void> {
    const bot = await this.botService.get('alpha');

    return bot.stop();
  }

  @Post('/getTree')
  public async getTree(): Promise<any> {
    const res = await this.botService.getTree();

    return {
      success: 1,
      data: {
        tree: res,
      },
    };
  }

  @Post('/updateTree')
  public async updateTree(
    @Body('data') data: any,
  ): Promise<any> {
    let response;
    try {
      const res = await this.botService.updateTree(data.tree);

      response = {
        success: 1,
        meta: {
          from: 'AUTOBOT',
        },
        data: {
          res,
        },
      };
    } catch (error) {
      response = {
        success: 0,
        // tslint:disable-next-line:object-shorthand-properties-first
        error,
      };
    }

    return _.extend(response, { meta: { from: 'AUTOBOT' }});

  }

  @Post('/updateNodes')
  public async updateNodes(
    @Body('nodes') nodes: any,
  ): Promise<any> {
    const res = await this.botService.updateNodes(nodes);

    return {
      success: 1,
      data: {},
    };
  }
}

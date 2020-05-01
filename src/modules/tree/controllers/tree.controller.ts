import {
  Controller,
  Get,
  Inject,
  Param,
  Post,
  Patch,
  UsePipes,
  ValidationPipe,
  Body,
} from '@nestjs/common';

import {
  COMMON_DI_CONSTANTS,
  ILogger,
  ITracer,
} from './../../../common';

import {
  DI_CONSTANTS,
} from './../../../di_constants';

import {
  IBTreeService,
} from './../services';

import {
  IBTree,
} from './../models';

import {
  TreeDto,
} from './../dto';

@Controller('tree')
export class TreeController {
  private readonly treeService: IBTreeService;
  private readonly logger: ILogger;

  private readonly tracer: ITracer;

  constructor(
    @Inject(COMMON_DI_CONSTANTS.ILogger)
    logger: ILogger,
    @Inject(COMMON_DI_CONSTANTS.ITracer)
    tracer: ITracer,
    @Inject(DI_CONSTANTS.IBTreeService)
    treeService: IBTreeService,
  ) {

    this.treeService = treeService;

    this.logger = logger;
    this.tracer = tracer;

    this
      .logger
      .info(`${DI_CONSTANTS.IBTreeService.toString()} CONTROLLER READY`);
  }

  @Get()
  // TODO: @UsePipes(ValidationPipe)
  public async get(): Promise<IBTree[] | any> {
    // throw new BadGatewayException();
    // return 'hello';
    return this.treeService.index();
  }

  @Patch()
  public async update(
    @Body('name') tree: TreeDto,
  ): Promise<void> {
    // const tree = await this.treeService.replace(tree);

    return;
  }
}

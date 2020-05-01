import {
  Injectable,
  Inject,
} from '@nestjs/common';

import {
  COMMON_DI_CONSTANTS,
  IConfigService,
  IConfig,
  IConfigRegistry,
  ILogger,
} from './../../../common';

import {
  DI_CONSTANTS,
} from './../../../di_constants';

import {
  IBlackboard,
  Blackboard,
  IFunctions,
  IParams,
} from './../models';

import {
  Functions,
  Params,
} from './..';

import {
  IBlackboardService,
} from './blackboard.service.interface';

@Injectable()
export class BlackboardService implements IBlackboardService {
  private config: IConfig;
  private logger: ILogger;

  private functions: IFunctions;
  private params: IParams;

  private blackboard: IBlackboard;

  constructor(
    @Inject(COMMON_DI_CONSTANTS.IConfig)
    config: IConfigRegistry,
    @Inject(COMMON_DI_CONSTANTS.ILogger)
    logger: ILogger,
  ) {
    this.config = config.get('blackboard');
    this.logger = logger;

    this.functions = Functions;
    this.params = Params;
  }

  public async init(): Promise<void> {
    this.logger.log('info', 'BLACKBOARD INIT');

    return;
  }

  public async create(): Promise<IBlackboard> {
    return new Blackboard(
      this.config,
      this.logger,
      this.functions,
      this.params,
    );
  }
}

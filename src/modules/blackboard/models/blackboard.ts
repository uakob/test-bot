import * as _ from 'lodash';

import {
  v4 as uuid,
} from 'uuid';

import { Storage } from './../functions/redis';
import {
  Injectable,
  Inject,
} from '@nestjs/common';

import {
  COMMON_DI_CONSTANTS,
  IConfigRegistry,
  IConfig,
  ILogger,
} from './../../../common';

import {
  DI_CONSTANTS,
} from './../../../di_constants';

import {
  IBot,
} from './../../bot';

import {
  IBlackboard,
  IFunctions,
  Fn,
  IParams,
  Param,
  Data,
} from './blackboard.interface';

// TODO: implement
@Injectable()
export class Blackboard implements IBlackboard {
  private readonly config: IConfig;
  private readonly logger: ILogger;

  public readonly storage: Storage;

  public readonly functions: IFunctions;
  public readonly params: IParams;
  public data: Data;

  private bot: IBot;

  constructor(
    config: IConfig,
    logger: ILogger,
    functions: IFunctions,
    params: IParams,
  ) {
    this.config = config;
    this.logger = logger;

    const reCheckTime = _.get(this.config.contactService, ['reCheckTime']);
    const redisHost = _.get(this.config.contactService, ['redis_host']);
    const redisPort = _.get(this.config.contactService, ['redis_port']);

    this.storage = new Storage(
      reCheckTime,
      redisHost,
      redisPort,
    );

    this.functions = functions;
    this.params = params;
    this.data = {};
  }

  public async init(): Promise<void> {
    this.data = {};
    this.data.runId = await uuid();

    this.data.history = [];

    return;
  }

  public async attach(bot: IBot): Promise<void> {
    this.bot = bot;

    return;
  }

  public getFn(code: string): Fn {
    return this.functions.get(code).bind(this);
  }

  public getParam(code: string): Param {
    let param = this.params.get(code);

    if (!param) {
      param = async () => {
        return code;
      };
    }
    return param.bind(this);
  }
}

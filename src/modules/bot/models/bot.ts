import {
  Injectable,
  Inject,
} from '@nestjs/common';

import {
  DI_CONSTANTS,
} from './../../../di_constants';

import {
  EBTNodeState,
  IBTree,
} from './../../tree';

import {
  IBlackboard,
  Fn,
  Param,
} from './../../blackboard';

import {
  EBotType,
  EBotState,
  IBot,
} from './bot.interface';

// TODO: logger
@Injectable()
export class Bot implements IBot {
  private loop: any;

  private state: EBotState;

  private tree: IBTree;
  private blackboard: IBlackboard;

  public readonly name: string;
  public readonly type: EBotType;

  constructor(
    name: string,
    type: EBotType = EBotType.REGULAR,
    blackboard: IBlackboard,
    tree: IBTree,
  ) {
    this.name = name;
    this.type = type;

    this.blackboard = blackboard;
    this.tree = tree;

    this.state = EBotState.IDLE;
  }

  public async init(): Promise<void> {
    await this.blackboard.attach(this);
    await this.blackboard.init();

    await this.tree.attach(this);
    await this.tree.init();

    this.state = EBotState.IDLE;

    return;
  }

  /**
   * starts bot to work
   */
  public async start(): Promise<void>  {
    this.state = EBotState.WORKING;
    this.loop = setInterval(async () => {
      const state: IteratorResult<EBTNodeState> = await this.tree.execute();

      if ([EBTNodeState.FAILURE, EBTNodeState.SUCCESS].includes(state.value)) {
        console.log(JSON.stringify({
          service: 'bot',
          call: 'loop',
          value: 'STATE',
          state: this.state,
        }));
        if (this.type === EBotType.REGULAR) {
          await this.init();
        } else if (this.type === EBotType.TEST) {
          await this.stop();
        } else {
          await this.stop();
          throw new Error('UNSUPPORTED BOT TYPE');
        }
      }
    // tslint:disable-next-line:align
    }, 1000); // TODO: config

    return;
  }

  /**
   * stopping bot
   */
  public async stop(): Promise<void>  {
    await this.init();
    this.state = EBotState.IDLE;
    clearInterval(this.loop);

    return;
  }

  /**
   * stopping bot
   */
  public async pause(): Promise<void>  {
    this.state = EBotState.PAUSED;

    return;
  }

  /**
   * returns bot state
   */
  public async getState(): Promise<EBotState> {
    return this.state;
  }

  public getAction(name: string): Fn {
    return this.blackboard.getFn(name);
  }

  public getParam(name: string): Param {
    return this.blackboard.getParam(name);
  }
}

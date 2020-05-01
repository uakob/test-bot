import {
  Inject,
  Injectable,
} from '@nestjs/common';

import * as _ from 'lodash';

import {
  v4 as uuid,
} from 'uuid';

import {
  DI_CONSTANTS,
} from './../../../di_constants';

import {
  COMMON_DI_CONSTANTS,
  IConfig,
  IConfigRegistry,
  ILogger,
} from './../../../common';

import {
  IBTree,
  IBTreeService,
} from './../../tree';

import {
  IBlackboardService,
  IBlackboard,
} from './../../blackboard';

import {
  IBotService,
} from './bot.service.interface';

import {
  IBot,
  Bot,
  EBotType,
} from './../models';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';

@Injectable()
export class BotService implements IBotService {
  private readonly config: IConfig;
  private readonly logger: ILogger;

  private blackboardService: IBlackboardService;

  private readonly pool: Map<String, IBot>;

  private treeService: IBTreeService;
  // TODO: refactor Pool to Pool Class
  // contains logic creating GUIDs and so on

  constructor(
    @Inject(COMMON_DI_CONSTANTS.IConfig)
    config: IConfigRegistry,
    @Inject(COMMON_DI_CONSTANTS.ILogger)
    logger: ILogger,
    @Inject(DI_CONSTANTS.IBTreeService)
    treeService: IBTreeService,
    @Inject(DI_CONSTANTS.IBlackboardService)
    blackboardService: IBlackboardService,
  ) {

    this.config = config.get('bot');
    this.logger = logger;

    this.treeService = treeService;
    this.blackboardService = blackboardService;

    this.pool = new Map();
  }

  public async init(): Promise<boolean> {
    if (this.config.autostart === 'true') {
      const bot = await this.create();
      await bot.start();
    }

    return true;
  }

  public async index(): Promise<IBot[]> {
    return [...this.pool.values()];
  }

  public async get(key: string): Promise<IBot> {
    return this.pool.get(key); // NOTE: what about keys
  }

  public async create(): Promise<IBot> {
    const blackboard = await this.blackboardService.create(); // return  constructor instead???
    const tree = await this.treeService.create();

    const type = (<Boolean> this.config.autostart)
      ? EBotType.REGULAR
      : EBotType.TEST;

    const bot = new Bot(
      'alpha',
      type,
      blackboard,
      tree,
    );

    // const key = uuid();
    const key = bot.name;

    await bot.init();

    // this.logger.debug(tree);
    this.pool.set(key, bot);

    return this.pool.get(key);
  }

  public async getTree(): Promise<any> {
    return await this.treeService.getTree();
  }

  public async updateTree(tree: any): Promise<boolean> {
    const alpha = this.pool.get('alpha'); // get somehow
    if (alpha) {
      await alpha.stop();
    }

    this.pool.delete('alpha');

    await this.treeService.replace(tree);

    const bot = await this.create();

    if (<Boolean> this.config.autostart) {
      await bot.start();
    }

    return true;
  }

  private async findNode(nodes: any, id: string): Promise<any> {
    for (const node of nodes) {
      if (node.id === id) {
        return node;
      }

      if (!node.nodes) {
        continue;
      } else {
        // tslint:disable-next-line:variable-name
        const _node = await this.findNode(node.nodes, id);
        if (!_node) {
          continue;
        }
        return _node;
      }
    }

  }

  public async updateNodes(nodes: any): Promise<any> {
    const tree = await this.getTree();

    // TODO: implement
    for (const node of nodes) {
      const source = await this.findNode(tree.nodes, node.id);

      await _.merge(source, node);
    }

    console.log(JSON.stringify({
      call: 'updateNodes',
      value: 'newTree',
      tree,
    }));

    return await this.updateTree(tree);
  }

  public async delete(key: string): Promise<boolean> {
    return this.pool.delete(key);
  }
}

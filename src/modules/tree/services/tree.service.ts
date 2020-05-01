import {
  Inject,
  Injectable,
} from '@nestjs/common';

import * as _ from 'lodash';

import * as mssql from 'mssql';

// import { lowdb } from 'lowdb';

// import { FileAsync } from 'lowdb/adapters/FileAsync';

import {
  COMMON_DI_CONSTANTS,
  IConfig,
  IConfigRegistry,
  ILogger,
} from './../../../common';

import {
  DI_CONSTANTS,
} from './../../../di_constants';

import {
  IBTree,
  BTree,
} from './../../tree';

// import {
//   IBTree,
//   Bot,
//   EBotType,
// } from './../models';

import {
  IBTreeService,
} from './tree.service.interface';

@Injectable()
export class TreeService implements IBTreeService {
  private readonly config: IConfig;
  private readonly logger: ILogger;

  private readonly configDB: mssql.config;
  private connection: mssql.ConnectionPool;

  private readonly setRequest: string;
  private readonly getRequest: string;

  private default: Object;
  // private tree: IBTree;

  constructor(
    @Inject(COMMON_DI_CONSTANTS.IConfig)
    config: IConfigRegistry,
    @Inject(COMMON_DI_CONSTANTS.ILogger)
    logger: ILogger,
  ) {
    this.config = config.get('tree');
    this.configDB = config.get('mssql') as unknown as mssql.config;
    this.logger = logger;

    // this.logger.debug('tree', this.tree);
    this.logger.debug('config', this.config);
    this.logger.debug('configDB', this.configDB);
  }

  public async init(): Promise<void> {
    try {
      this.logger.debug('INIT TREE SERVICE');

      if (this.connection) {
        await this.connection.close();
      }

      this.connection = await new mssql
        .ConnectionPool(this.configDB)
        .connect();
      try {
        this.default = await this.getTree();
      } catch (error) {
        this.default = {
          nodes: [
            {
              id: 'b94c3073-a0da-400a-9b38-ace1d2635d50',
              type: 'TASK',
              visible: true,
              editable: false,
              action: {
                fn: {
                  code: 'needUpdate',
                  name: 'Отправить оповещение о невалидном дереве',
                },
              },
            },
          ],
        };
        // throw new Error('TREE_INIT_ERROR');
      }

      this.logger.debug('this.default', this.default);

      return;
    } catch (error) {
      throw new Error('TREE_INIT_ERROR');
    }
  }

  public async create(): Promise<IBTree> {
    this.logger.debug(this.default);

    await this.init();

    return new BTree(this.default);
  }

  public async replace(tree: Object): Promise<boolean> {
    try {
      await this.setTree(tree);
      this.default = await this.getTree();

      return true;
    } catch (error) {
      this.logger.error('Tree Service ERROR', error);

      return false;
    }
  }

  public async getTree(): Promise<string> {
    const req = await new mssql.Request(this.connection);
    const res = await req.query(
      `SELECT tree_value
      FROM Bot.trees
      WHERE tree_name = 'default'`);

    try {
      const tree = JSON.parse(res.recordset[0].tree_value);
      return tree;
    } catch (error) {
      throw error;
    }

  }

  public async setTree(tree: Object): Promise<boolean> {
    try {
      const req = await new mssql.Request(this.connection);
      const res = await req.query(
        `UPDATE bot.trees
        SET tree_value='${JSON.stringify(tree)}'
        WHERE tree_name = 'default'`,
      );

      return true;
    } catch (error) {
      return false;
    }
  }

  // public async delete(name: string): Promise<boolean> {
  //   return this.tree = null;
  // }
}

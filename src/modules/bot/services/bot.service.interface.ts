import {
  IService,
} from './../../../service.interface';

import {
  IBot,
} from './../models';

export interface IBotService extends IService<IBot> {
  index(): Promise<IBot[]>;
  create(): Promise<IBot>;
  get(key: string): Promise<IBot>;
  delete(key: string): Promise<boolean>;
  updateTree(tree: any): Promise<boolean>;
  updateNodes(nodes: any): Promise<boolean>;
  getTree(): Promise<any>;
}

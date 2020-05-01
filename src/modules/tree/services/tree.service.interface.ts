import {
  IService,
} from './../../../service.interface';

import {
  IBTree,
} from './../models';

export interface IBTreeService extends IService<IBTree> {
  // index(): Promise<IBTree[]>;
  // get(key: string): Promise<IBTree>;
  // delete(key: string): Promise<boolean>;
  getTree(): Promise<string>;
  create(tree?: IBTree): Promise<IBTree>;
  replace(tree: IBTree): Promise<boolean>;
}

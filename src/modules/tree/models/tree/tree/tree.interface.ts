import * as _ from 'lodash';

import {
  IBot,
} from './../../../../bot';

import {
  EBTNodeType,
  IBTNode,
} from './../node';

export interface OMap<T> {
  [key:number]: T;
}

export interface OList<T> {
  values: OMap<T>;

  [Symbol.asyncIterator](): AsyncIterator<T>;
}

export class List<T> implements OList<T> {
  public readonly values: OMap<T>;

  constructor(values: T[]) {
    this.values = values;
  }

  [Symbol.asyncIterator] = this.createIterator;

  public createIterator() {
    return (async function *f() {
      let ptr = 0;
      while (this.values[ptr++]) {
        yield await this.values[ptr];
      }

      return;
    }).bind(this)();
  }
}

export interface IBTree extends IBTNode {
  root: IBTNode;
  attach(bot: IBot): Promise<void>;
  // nodes?: IBTNode[];
}

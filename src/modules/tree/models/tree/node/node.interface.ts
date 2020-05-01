import {
  IAction,
} from './action';

import {
  ICondition,
} from './condition';

export enum EBTNodeState {
  INIT = 'INIT', // ?
  RUNNING = 'RUNNING',
  SUCCESS = 'SUCCESS',
  FAILURE = 'FAILURE',
  TERMINATE = 'TERMINATE', // ?
}
// TODO: transitions with exceptions if illegal transition trying to be applied at single node

export enum EBTNodeType {
  SELECTOR = 'SELECTOR',
  SEQUENCE = 'SEQUENCE',
  DECORATOR = 'DECORATOR',
  TASK = 'TASK',
}

export interface IBTNode {
  type: EBTNodeType;
  execute(): Promise<IteratorResult<EBTNodeState>>;
  init(): Promise<EBTNodeState>;
  nodes?: IBTNode[];
  action?: IAction;
  condition?: ICondition;
}

export interface IRunnable {
  run(): Promise<EBTNodeState>;
  interrupt(): Promise<EBTNodeState>;
}

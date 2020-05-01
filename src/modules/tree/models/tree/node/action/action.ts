import {
  Fn,
} from './../../../../../blackboard';

import {
  IRunnable,
  EBTNodeState,
} from './../../node';

import {
  IAction,
} from './action.interface';

export abstract class AAction implements IRunnable {
  abstract run(): Promise<EBTNodeState>;
  abstract interrupt(): Promise<EBTNodeState>;
  abstract fn: Fn;
}

export class Action extends AAction implements IAction {
  public readonly fn: Fn;

  constructor(fn: Fn) { // TODO: it must be POINTER LIKE!!!!!!!?
    super();

    this.fn = fn;
  }

  public async run(): Promise<EBTNodeState> {
    const result = await this.fn();

    return result
      ? EBTNodeState.SUCCESS
      : EBTNodeState.FAILURE;
  }

  public async interrupt(): Promise<EBTNodeState> {
    return EBTNodeState.INIT;
  }
}

export default Action;

import {
  ABTNode,
} from './../../node/node';

import {
  EBTNodeType,
  EBTNodeState,
} from './../../node/node.interface';

import {
  AAction,
} from './../action';

import {
  IBTTask,
} from './task.interface';

export class BTTask extends ABTNode implements IBTTask {
  public action: AAction;

  public state: EBTNodeState;

  private executor: AsyncIterableIterator<EBTNodeState>;

  private counter: number = 0;

  constructor(action: AAction) {
    super(EBTNodeType.TASK);

    this.counter = 0;
    this.action = action;

    this.state = EBTNodeState.INIT;

    this.executor = this.createExecutor();
  }

  private createExecutor() {
    return (async function *f() {
      yield this.state = EBTNodeState.RUNNING;
      this.state = await this.action.run();
      console.log(JSON.stringify({
        service: 'TASK',
        call: 'RUN',
        value: 'STATE',
        state: this.state,
      }));
      // tslint:disable-next-line:max-line-length
      // yield this.state = await this.action(); // because it's running before if and we not stepping in
      // NOTE: it MUST NOT be if
      while (![
        EBTNodeState.SUCCESS,
        EBTNodeState.FAILURE,
      ].includes(this.state)) {
        yield this.state;
      }

      console.log(JSON.stringify({
        service: 'TASK',
        call: 'YIELD',
        value: 'STATE',
        state: this.state,
      }));

      return this.state;
    }).bind(this)();
    // TODO: remove side-effect model
    // TODO: NOPE we can't afford this because cannot have two instanses of this
  }

  public async execute(): Promise<IteratorResult<EBTNodeState>> {
    return this.executor.next();
  }

  public async init(): Promise<EBTNodeState> {
    this.state = await this.action.interrupt();

    this.executor = this.createExecutor();

    return this.state;
  }
}

import {
  ABTNode,
} from './../../node/node';

import {
  EBTNodeType,
  EBTNodeState,
} from './../../node/node.interface';

import {
  ACondition,
  ICondition,
} from './../condition';

import {
  IBTDecorator,
} from './decorator.interface';

export class BTDecorator extends ABTNode implements IBTDecorator {
  public condition: ICondition;

  public state: EBTNodeState;

  private executor: AsyncIterableIterator<EBTNodeState>;

  constructor(condition: ICondition) {
    super(EBTNodeType.DECORATOR);
    this.condition = condition;

    this.state = EBTNodeState.INIT;

    this.executor = this.createExecutor();
  }

  private createExecutor() {
    return (async function *f() {
      // TODO: next two statements must be one, e.g.
      // yield this.state = await this.condition.run();
      yield this.state = EBTNodeState.RUNNING;
      this.state = await this.condition.run();

      while (![
        EBTNodeState.SUCCESS,
        EBTNodeState.FAILURE,
      ].includes(this.state)) {
        yield this.state;
      }

      console.log(JSON.stringify({
        service: 'DECORATOR',
        call: 'YIELD',
        value: 'STATE',
        state: this.state,
      }));
      // this.state = EBTNodeState.TERMINATE;
      return this.state;
    }).bind(this)();
  }

  public async execute(): Promise<IteratorResult<EBTNodeState>> {
    // return await this.executor.next();
    return this.executor.next();
  }

  public async init(): Promise<EBTNodeState> {

    await this.condition.interrupt();
    this.state = EBTNodeState.INIT;

    this.executor = this.createExecutor();

    return this.state;
  }
}

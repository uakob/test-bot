import {
  EBTNodeType,
  EBTNodeState,
  IBTNode,
} from './../node.interface';

import {
  ABTNode,
} from './../node';

import {
  IBTSelector,
} from './selector.interface';

export class BTSelector extends ABTNode implements IBTSelector {
  public executor: any;

  public nodes: IBTNode[];

  public state: EBTNodeState;

  constructor(nodes: IBTNode[]) {
    super(EBTNodeType.SELECTOR);

    this.nodes = nodes;

    this.executor = this.createExecutor();

    this.state = EBTNodeState.INIT;
  }

  // what's solution can be applied here?...
  private createExecutor() {
    // accumulator?...
    return (async function *f() {
      let current;

      yield this.state = EBTNodeState.RUNNING; // am i need that?

      while (this.state === EBTNodeState.RUNNING) {
        for (const node of this.nodes) {
          current = node;

          await node.execute();

          if ([
            EBTNodeState.RUNNING,
            EBTNodeState.SUCCESS,
          ].includes(node.state)) {
            break;
          }

          if ([
            EBTNodeState.FAILURE,
          ].includes(node.state)) {
            continue;
          }
        }

        this.state = current.state;

        if ([
          EBTNodeState.SUCCESS,
        ].includes(this.state)) {
          break;
        }

        if ([
          EBTNodeState.RUNNING,
        ].includes(this.state)) {
          yield this.state;
        }

        console.log(JSON.stringify({
          service: 'SELECTOR',
          call: 'RUN',
          value: 'STATE',
          state: this.state,
        }));

      }

      return this.state;

    }).bind(this)();
  }

  // TODO: to abstract class ABTNode or ABTComposite (need to implements)
  public async execute(): Promise<IteratorResult<EBTNodeState>> {
    // this.state = EBTNodeState.RUNNING;

    // return await this.executor.next();
    return this.executor.next();
  }

  // TODO: to abstract class ABTNode or ABTComposite (need to implements)
  public async init(): Promise<EBTNodeState> {
    for await (const node of this.nodes) {
      this.state = await node.init();
    }

    this.executor = this.createExecutor();

    return this.state;
  }
}

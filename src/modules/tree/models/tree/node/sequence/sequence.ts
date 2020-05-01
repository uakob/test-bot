import * as _ from 'lodash';

// import {
//   OList,
// } from './../../tree';

import {
  EBTNodeType,
  EBTNodeState,
  IBTNode,
} from './../node.interface';

import {
  ABTNode,
} from './../node';

import {
  IBTSequence,
} from './sequence.interface';

export class BTSequence extends ABTNode implements IBTSequence {
  public executor: any;

  public nodes: IBTNode[];

  public state: EBTNodeState;

  constructor(nodes: IBTNode[]) {
    super(EBTNodeType.SEQUENCE);

    this.nodes = nodes;

    this.executor = this.createExecutor();

    this.state = EBTNodeState.INIT;
  }

  private createExecutor() {
    return (async function *f() {
      let current;

      yield this.state = EBTNodeState.RUNNING; // am i need that?

      while (this.state === EBTNodeState.RUNNING) {
        for (const node of this.nodes) {
          current = node;

          await node.execute();

          if ([
            EBTNodeState.FAILURE,
            EBTNodeState.RUNNING,
          ].includes(node.state)) {
            break;
          }

          if ([
            EBTNodeState.SUCCESS,
          ].includes(node.state)) {
            continue;
          }
        }

        this.state = current.state;

        if ([
          EBTNodeState.RUNNING,
        ].includes(this.state)) {
          yield this.state;
        }

        // if ([
        //   EBTNodeState.FAILURE,
        //   EBTNodeState.SUCCESS,
        // ].includes(this.state)) {
        //   break;
        // }

        console.log(JSON.stringify({
          service: 'SEQUENCE',
          call: 'RUN',
          value: 'STATE',
          state: this.state,
        }));
      }

      return this.state;

    }).bind(this)();
  }

    // TODO: to abstract class ABTNode or ABTComposite (need to implement)
  public async execute(): Promise<IteratorResult<EBTNodeState>> {
    // this.state = EBTNodeState.RUNNING;

    // return await this.executor.next();
    return this.executor.next();
  }

  // TODO: to abstract class ABTNode or ABTComposite (need to implement)
  public async init(): Promise<EBTNodeState> {
    for await (const node of this.nodes) {
      this.state = await node.init();
    }

    this.executor = this.createExecutor();

    return this.state;
  }
}

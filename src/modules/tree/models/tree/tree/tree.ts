import * as _ from 'lodash';

import {
  IBot,
} from './../../../../bot';

import {
  IBTNode,
  EBTNodeType,
  EBTNodeState,
  Action,
  BTSelector,
  BTSequence,
  // Condition,
  BTDecorator,
  BTTask,
} from './../node';

import { Condition } from './../node/condition';

import {
  IBTree,
} from './tree.interface';

// NOTE: evaluation from LEFT to RIGHT ON>LY
// TODO: Parallel (patallel execution composite node)
// TODO: add Loop (and true decorator?)
export class BTree implements IBTree {
  private source: any; // TODO: schema
  public type: EBTNodeType;

  private bot: IBot;

  public executor: any;

  public root: IBTNode;
  // TODO: public nodes: IBTNode[]; // NOTE: must be once, but in array

  public state: EBTNodeState;

  constructor(source: any) {

    this.source = source;

    this.executor = this.createExecutor();

    this.state = EBTNodeState.INIT;
  }

  public async attach(bot: IBot): Promise<void> {
    this.bot = bot;

    return;
  }

  public async init(): Promise<EBTNodeState> {
    console.log(JSON.stringify({
      value: 'TREE INIT',
      state: this.state,
    }));
    try {
      this.root = await this.build(this.source.nodes[0]);
      this.executor = await this.createExecutor();

      this.state = await this.root.init();

      return this.state;
    } catch (error) {
      console.log(JSON.stringify({
        value: 'TREE INIT FAILURE, waiting for update tree',
        state: 'FAILURE',
      }));
    }

  }

  // TODO: refactor to truly recusrsive function W/O conditional branching
  // TODO: procedure -> builder
  private build(node: any): IBTNode {
    try {
      if ([
        EBTNodeType.SEQUENCE,
        EBTNodeType.SELECTOR,
      ].includes(node.type)) {
        // tslint:disable-next-line:variable-name
        const nodes: IBTNode[] = _.map(node.nodes, (_node: IBTNode) => {
          return this.build(_node);
        });

        switch (node.type) {
          case EBTNodeType.SELECTOR:
            return new BTSelector(nodes);
            break;

          case EBTNodeType.SEQUENCE:
            return new BTSequence(nodes);
            break;
        }

        return node;
      }

      if ([
        EBTNodeType.DECORATOR,
        EBTNodeType.TASK,
      ].includes(node.type)) {
        switch (node.type) {
          case EBTNodeType.DECORATOR:
            const source = this.bot.getParam(node.condition.source.code);
            const target = this.bot.getParam(node.condition.target.code);

            const cond = new Condition(
              source,
              target,
              node.condition.operator.code,
            );

            return new BTDecorator(cond);
            break;

          case EBTNodeType.TASK:
            // TODO: need late binding
            const fn = this.bot.getAction(node.action.fn.code);
            const action = new Action(fn);

            return new BTTask(action);
            break;
        }
        return node;
      }
    } catch (error) {
      throw error;
    }
  }
  private createExecutor() {
    return (async function *f() {
      this.state = EBTNodeState.RUNNING;

      while (this.state === EBTNodeState.RUNNING) {
        await this.root.execute();

        this.state = this.root.state;
        console.log(JSON.stringify({
          service: 'TREE',
          call: 'RUN',
          value: 'STATE',
          state: this.state,
        }));

        yield this.state;
      }

      return this.state;

    }).bind(this)();
  }

  public async execute(): Promise<IteratorResult<EBTNodeState>> {
    // this.state = await this.executor.next();

    return this.executor.next();
  }
}

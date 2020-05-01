import * as _ from 'lodash';

import {
  IRunnable,
  EBTNodeState,
} from './../../node';

import {
  ICondition,
  EOperator,
} from './condition.interface';

export abstract class ACondition implements IRunnable {
  abstract run(): Promise<EBTNodeState>;
  abstract interrupt(): Promise<EBTNodeState>;
}

export class Condition extends ACondition implements ICondition {
  public readonly source: any;
  public readonly target: any;
  public readonly operator: EOperator;

  private result: boolean;

  constructor(
    source: any,
    target: any,
    operator: EOperator,
  ) {
    super();

      // NOTE: i can't do something like value(42),
      // only the way it's scalar at the tree declaration
      // it causes that checks and so on
    if (source.call) {
      this.source = source;
    } else {
      this.source = () => source;
    }

    if (target.call) {
      this.target = target;
    } else {
      this.target = () => target;
    }

    this.operator = operator;
  }

  private async check(): Promise<boolean> {

    this.source.result = await this.source.call();
    this.target.result = await this.target.call();
    switch (this.operator) {
      case EOperator.EQ:
        return this.source.result === this.target.result;
        break;

      case EOperator.NE:
        return this.source.result !== this.target.result;
        break;

      case EOperator.LT:
        return this.source.result < this.target.result;
        break;

      case EOperator.GT:
        return this.source.result > this.target.result;
        break;

      case EOperator.IN:
        return _.includes(this.source.result, this.target.result);
        break;

      case EOperator.OUT:
        return !_.includes(this.source.result, this.target.result);
        break;
    }
  }
  public async run(): Promise<EBTNodeState> {

    this.result = await this.check();

    console.log(JSON.stringify({
      class: 'condition',
      call: 'run',
      sourceName: this.source.name,
      sourceType: typeof this.source.name,
      sourceValue: this.source.result,
      targetName: this.target.name,
      targetType: typeof this.target.name,
      targetValue: this.target.result,
      operator: this.operator,
      result: this.result,
    }));

    return this.result
      ? EBTNodeState.SUCCESS
      : EBTNodeState.FAILURE;
  }

  public async interrupt(): Promise<EBTNodeState> {
    return EBTNodeState.INIT;
  }
}

export default Condition;

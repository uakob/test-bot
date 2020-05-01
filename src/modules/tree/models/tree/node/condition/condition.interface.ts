import {
  EBTNodeState,
} from './../node.interface';

export enum EOperator {
  EQ = 'EQ',
  NE = 'NE',
  LT = 'LT',
  GT = 'GT',
  IN = 'IN',
  OUT = 'OUT',
}

export interface ICondition {
  source: any;
  target: any;
  operator: EOperator;
  run(): Promise<EBTNodeState>;
  interrupt(): Promise<EBTNodeState>;
}

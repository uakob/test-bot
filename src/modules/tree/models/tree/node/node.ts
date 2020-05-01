import {
  IBTNode,
  EBTNodeType,
  EBTNodeState,
} from './node.interface';

export abstract class ABTNode implements IBTNode {
  type: EBTNodeType;

  abstract state: EBTNodeState;
  abstract execute(): Promise<IteratorResult<EBTNodeState>>;
  abstract init(): Promise<EBTNodeState>;

  constructor(type: EBTNodeType) {
    this.type = type;
  }
}

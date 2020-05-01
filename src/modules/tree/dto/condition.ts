import {
  IsDefined,
  IsInstance,
  IsString,
  IsIn,
} from 'class-validator';

import {
  EOperator,
} from './../models/tree/node/condition';

import {
  NodeDto,
} from './node';

export enum Params {
  'param_1',
  'param_2',
}

export class ConditionInner {
  @IsDefined()
  @IsString()
  @IsIn(Object.keys(Params))
  readonly source: Params;

  @IsDefined()
  @IsString()
  @IsIn(Object.keys(Params))
  readonly target: Params;

  @IsDefined()
  @IsString()
  @IsIn(Object.keys(EOperator))
  readonly operator: EOperator;
}

export class ConditionDto extends NodeDto {
  @IsDefined()
  @IsInstance(ConditionInner)
  readonly condition: ConditionInner;
}

export default ConditionDto;

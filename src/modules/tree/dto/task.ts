
import {
  IsDefined,
  ValidateNested,
  IsString,
  IsIn,
  IsInstance,
} from 'class-validator';

import {
  EBTNodeType,
} from '../models';

import {
  NodeDto,
} from './node';

import {
  ActionDto,
} from './action';

export class TaskDto extends NodeDto {
  @IsDefined()
  @ValidateNested()
  @IsInstance(ActionDto)
  readonly action: ActionDto;

  @IsDefined()
  @IsString()
  @IsIn([EBTNodeType.TASK])
  readonly type: EBTNodeType;
}

export default TaskDto;

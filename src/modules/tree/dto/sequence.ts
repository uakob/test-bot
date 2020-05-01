import {
  IsDefined,
  IsString,
  IsIn,
} from 'class-validator';

import {
  EBTNodeType,
} from './../models';

import {
  CompositeDto,
} from './composite';

export class SequenceDto extends CompositeDto {
  @IsDefined()
  @IsString()
  @IsIn([EBTNodeType.SEQUENCE])
  readonly type: EBTNodeType;
}

export default SequenceDto;

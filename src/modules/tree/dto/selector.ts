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

export class SelectorDto extends CompositeDto {
  @IsDefined()
  @IsString()
  @IsIn([EBTNodeType.SELECTOR])
  readonly type: EBTNodeType;
}

export default SelectorDto;

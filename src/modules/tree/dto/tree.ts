import {
  IsArray,
  ArrayMaxSize,
  IsDefined,
  ValidateNested,
} from 'class-validator';

import {
  NodeDto,
} from './node';

export class TreeDto {
  @IsDefined()
  @ValidateNested()
  @ArrayMaxSize(1)
  @IsArray()
  nodes: NodeDto[];
}

export default TreeDto;

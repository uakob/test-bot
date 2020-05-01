import {
  IsDefined,
  ValidateNested,
  IsArray,
  ArrayMinSize,
} from 'class-validator';

import {
  NodeDto,
} from './node';

export class CompositeDto extends NodeDto {
  @IsDefined()
  @ValidateNested()
  @ArrayMinSize(2)
  @IsArray()
  nodes: NodeDto[];
}

export default CompositeDto;

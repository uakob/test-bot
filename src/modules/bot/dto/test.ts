import {
  IsString,
  IsDefined,
  IsInt,
} from 'class-validator';

export class TestDto {
  @IsString()
  readonly answer: string;

  @IsInt()
  readonly age: number;

  // @IsDefined()
  // readonly some: any;
}

export default TestDto;

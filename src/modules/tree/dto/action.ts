import {
  IsString,
  IsIn,
  IsDefined,
  IsInstance,
} from 'class-validator';

const actions = [
  'some_test_1',
  'some_test_2',
];

class ActionInner {
  @IsDefined()
  @IsString()
  @IsIn(actions)
  readonly name: string;
}

export class ActionDto {
  @IsDefined()
  @IsInstance(ActionInner)
  readonly action: ActionInner;
}

export default ActionDto;

import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

import * as Joi from 'joi';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
  constructor(private readonly schema: Object) {}

  async transform(value: any, metadata: ArgumentMetadata) {
    const { error } = Joi.validate(value, this.schema);

    if (error) {
      throw new BadRequestException('Validation failed');
    }
    return value;
  }
}

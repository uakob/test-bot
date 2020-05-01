import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
  Inject,
} from '@nestjs/common';

import {
  validate,
} from 'class-validator';
import {
  plainToClass,
} from 'class-transformer';

import {
  COMMON_DI_CONSTANTS,
} from './../../../common_di_constants';

import {
  ILogger,
} from './../../logger';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  private logger: ILogger;

  constructor(
    @Inject(COMMON_DI_CONSTANTS.ILogger)
    logger: ILogger,
  ) {
    this.logger = logger;
    this.logger.debug('ValidationPipe: constructor().call');
  }
  async transform(value: any, { metatype }: ArgumentMetadata) {
    this.logger.debug('ValidationPipe: transform().call');
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }

    const object = plainToClass(metatype, value);
    const errors = await validate(object);

    if (errors.length > 0) {
      this.logger.error(errors);
      throw new BadRequestException('Validation failed');
    }

    return value;
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}

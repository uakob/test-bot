import * as Joi from 'joi';

import {
  compositeSchema,
} from './composite';

export const selectorSchema: Joi.ObjectSchema = compositeSchema.keys({
  type: Joi.string().valid('selector').required(),
});

export default selectorSchema;

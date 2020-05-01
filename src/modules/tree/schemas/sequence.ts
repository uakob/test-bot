import * as Joi from 'joi';

import {
  compositeSchema,
} from './composite';

export const sequenceSchema: Joi.ObjectSchema = compositeSchema.keys({
  type: Joi.string().valid('sequence').required(),
});

export default sequenceSchema;

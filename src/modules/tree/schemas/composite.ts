import * as Joi from 'joi';

import {
  nodeSchema,
} from './node';

export const compositeSchema: Joi.ObjectSchema = nodeSchema.keys({
  nodes: Joi.array()
    .items(nodeSchema)
    .min(2)
    .required(),
});

export default compositeSchema;

import * as Joi from 'joi';

import {
  nodeSchema,
} from './node';

export const treeSchema: Joi.ObjectSchema = Joi.object({
  nodes: Joi.array()
    .items(nodeSchema)
    .required(),
});

export default treeSchema;

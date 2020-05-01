import * as Joi from 'joi';

export const config: Joi.ObjectSchema = Joi.object({
  CHECK_TRESHOLD: Joi.number()
    .required(),
  CHECK_TIME: Joi.number()
    .required(),
  REQUEST_TIME: Joi.number()
    .required(),
  ORDER_MAX_SUM: Joi.number()
    .required(),
  RESOLUTION_ID: Joi.number()
    .required(),
})
  .required();

export default config;

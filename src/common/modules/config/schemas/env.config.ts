import * as Joi from 'joi';

export const config: Joi.ObjectSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid([
      'development',
      'production',
    ])
    .default('development')
    .required(),
  BOT_HOST: Joi.any()
    .required(),
  BOT_PORT: Joi.number()
    .required(),
  BOT_SESSION: Joi.string()
    .required(),
  BOT_AUTO: Joi.boolean()
    .required(),
  BOT_REDIS_HOST: Joi.any()
    .required(),
  BOT_REDIS_PORT: Joi.number()
    .optional(),
  BOT_LOCK_COUNTER: Joi.number()
    .required(),
  API_OMS_SCHEMA: Joi.string()
    .required(),
  API_OMS_HOST: Joi.string()
    .required(),
  API_OMS_PORT: Joi.string()
    .required(),
  MSSQL_INSTANCE: Joi.string()
    .required(),
  MSSQL_USER: Joi.string()
    .required(),
  MSSQL_PASSWORD: Joi.string()
    .required(),
  MSSQL_DBNAME: Joi.string()
    .required(),
  CCS_SCHEME: Joi.string()
    .required(),
  CCS_HOST: Joi.string()
    .required(),
  CCS_PORT: Joi.number()
    .required(),
  CMN_SCHEME: Joi.string()
    .required(),
  CMN_HOST: Joi.string()
    .required(),
  CMN_PORT: Joi.number()
    .required(),
  JAEGER_SERVICE_NAME: Joi.string()
    .required(),
  JAEGER_REPORTER_AGENT_HOST: Joi.string()
    .required(),
  JAEGER_REPORTER_AGENT_PORT: Joi.number()
    .required(),
  JAEGER_REPORTER_LOG_SPANS: Joi.number()
    .required(),
  JAEGER_SAMPLER_TYPE: Joi.string()
    .valid([
      'const',
      'probabilistic',
      'ratelimiting',
      'remote',
    ])
    .required(),
  JAEGER_SAMPLER_PARAM: Joi.number()
    .required(),
  COLLECTOR_ZIPKIN_HTTP_PORT: Joi.number()
  .required(),
});

export default config;

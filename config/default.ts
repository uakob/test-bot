export const config = {
  tree: {
    nodes: [
      {
        type: 'SELECTOR',
        nodes: [
          {
            type: 'SEQUENCE',
            nodes: [
              {
                type: 'DECORATOR',
                condition: {
                  source: 'botActive',
                  target: true,
                  operator: 'EQ',
                },
              },
              {
                type: 'TASK',
                action: {
                  fn: 'setMeta',
                },
              },
              {
                type: 'TASK',
                action: {
                  fn: 'setSessionId',
                },
              },
              {
                type: 'TASK',
                action: {
                  fn: 'getRequest',
                },
              },
              // {
              //   type: 'TASK',
              //   action: {
              //     fn: 'getRequestOrderList',
              //   },
              // },
              // {
              //   type: 'TASK',
              //   action: {
              //     fn: 'getOrder',
              //   },
              // },
              {
                type: 'DECORATOR',
                condition: {
                  source: 'requestType',
                  target: 'CCS',
                  operator: 'EQ',
                },
              },
              {
                type: 'DECORATOR',
                condition: {
                  source: 'resolutionType',
                  target: 31,
                  operator: 'NE',
                },
              },
              {
                type: 'DECORATOR',
                condition: {
                  source: 'requestActual',
                  target: true,
                  operator: 'EQ',
                },
              },
              {
                type: 'DECORATOR',
                condition: {
                  source: 'requestTargetsCount',
                  target: 1,
                  operator: 'EQ',
                },
              },
              {
                type: 'DECORATOR',
                condition: {
                  source: 'requestTarget',
                  target: 1,
                  operator: 'EQ',
                },
              },
              {
                type: 'DECORATOR',
                condition: {
                  source: 'scenarioActive',
                  target: true,
                  operator: 'EQ',
                },
              },
              {
                type: 'DECORATOR',
                condition: {
                  source: 'requestTime',
                  target: 1,
                  operator: 'GT',
                },
              },
              {
                type: 'SELECTOR',
                nodes: [
                  {
                    type: 'SEQUENCE',
                    nodes: [
                      {
                        type: 'TASK',
                        action: {
                          fn: 'requestStatusProcess',
                        },
                      },
                      {
                        type: 'TASK',
                        action: {
                          fn: 'getRequestOrderList',
                        },
                      },
                      {
                        type: 'TASK',
                        action: {
                          fn: 'getOrder',
                        },
                      },
                      // {
                      //   type: 'TASK',
                      //   action: {
                      //     fn: 'stop',
                      //   },
                      // },
                      {
                        type: 'DECORATOR',
                        condition: {
                          source: 'ordersSum',
                          target: 10000,
                          operator: 'LT',
                        },
                      },
                      {
                        type: 'DECORATOR',
                        condition: {
                          source: 'orderActiveItemsCount',
                          target: 0,
                          operator: 'GT',
                        },
                      },
                      {
                        type: 'TASK',
                        action: {
                          fn: 'deliveryStatusConfirm',
                        },
                      },
                      {
                        type: 'TASK',
                        action: {
                          fn: 'commentAdd',
                        },
                      },
                      {
                        type: 'TASK',
                        action: {
                          fn: 'eventEmit',
                        },
                      },
                      {
                        type: 'TASK',
                        action: {
                          fn: 'requestStatusClosed',
                        },
                      },
                    ],
                  },
                  {
                    type: 'SEQUENCE',
                    nodes: [
                      {
                        type: 'TASK',
                        action: {
                          fn: 'requestLock',
                        },
                      },
                      {
                        type: 'TASK',
                        action: {
                          fn: 'requestStatusHold',
                        },
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            type: 'TASK',
            action: {
              fn: 'requestLock',
            },
          },
        ],
      },
    ],
  },
  blackboard: {
    contactService: {
      sessionId: process.env.BOT_SESSION,
      scheme: process.env.CCS_SCHEME,
      host: process.env.CCS_HOST,
      port: process.env.CCS_PORT,
      redis_host: process.env.BOT_REDIS_HOST,
      redis_port: process.env.BOT_REDIS_PORT,
      defaultTimeout: process.env.CCS_TIMEOUT,
      reCheckTime: process.env.BOT_LOCK_COUNTER,
      reCheckTreshold: 1000,
      requestTimeMinutes: 1,
      orderMaxSum: 10000,
      resolutionid: 44,
      url: `${process.env.CCS_SCHEME}://${process.env.CCS_HOST}:${process.env.CCS_PORT}`,
      API: {
        getQueueList: '',
        holdRequest: '',
        closeRequest: '',
        processRequest: '',
        getCurrentRequest: '',
        confirmOrder: '',
        deliveryReject: '',
        getOrderList: '',
        saveComment: '',
      },
    }
  },
  bot: {
    session: process.env.BOT_SESSION,
    name: 'Sh0dAn',
    autostart: process.env.BOT_AUTO,
  },
  tracer: {
    jaeger: {
      serviceName: process.env.JAEGER_SERVICE_NAME,
      reporter: {
        logSpans: process.env.JAEGER_REPORTER_LOG_SPANS,
        agentHost: process.env.JAEGER_REPORTER_AGENT_HOST,
        agentPort: process.env.JAEGER_REPORTER_AGENT_PORT,
      },
      sampler: {
        type: process.env.JAEGER_SAMPLER_TYPE,
        param: Number(process.env.JAEGER_SAMPLER_PARAM),
      },
      maxJsonSizeInBytes: 1000,
    },
  },
  validation: {
    validator: 'object',
  },
  mssql: {
    server: process.env.MSSQL_INSTANCE,
    user: process.env.MSSQL_USER,
    username: process.env.MSSQL_USER,
    password: process.env.MSSQL_PASSWORD,
    database: process.env.MSSQL_DBNAME,
  },
  app: {
    port: process.env.BOT_PORT,
    host: process.env.BOT_HOST,
  },
  logger: {
    level:  process.env.NODE_ENV === 'prod' ? 'info' : 'debug',
  },
  TRACE: {
    samplerType: process.env.JAEGER_SAMPLER_TYPE,
    samplerParam: process.env.NODE_ENV === 'prod' ? 0 : process.env.JAEGER_SAMPLER_PARAM,
    reporterLogSpans: process.env.JAEGER_REPORTER_LOG_SPANS,
    reporterAgentHost: process.env.JAEGER_REPORTER_AGENT_HOST,
    reporterAgentPort: process.env.JAEGER_REPORTER_AGENT_PORT,
    serviceName: process.env.JAEGER_SERVICE_NAME,
    MAX_JSON_SIZE_IN_BYTES: 4000,
  },
  REQUEST_TARGET_CODES: {
    CHANGE_DELIVERY_DATE_ACCEPT_STAGE: 3,
    CHANGE_DELIVERY_METHOD: 6,
    CHANGE_DELIVERY_DATE: 7,
  },
  REQUEST_STAGES_CODES: {
    CREATED: 'CREATED',
    IN_PROGRESS: 'IN PROGRESS',
    CLOSE: 'CLOSE',
    HOLD: 'HOLD',
    RECALL: 'RECALL',
    CANCELED: 'CANCELED',
  },
  REQUEST_RESOLUTIONS_IDS: {
    CANT_RECALL: 30, // Недозвон
  },
  DELIVERY_REJECT_RESOLUTION_IDS: {
    NOT_AVAILABLE_GET_DELIVERY: 27, // Нет возможности получить заказ
  },
  EVENTS: {
    ON_SETTINGS_CHANGE: 'ON_SETTINGS_CHANGE',
  },
};

export default config;

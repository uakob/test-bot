// import {
//   LoggerService as LoggerBase,
// } from '@nestjs/common';

import {
  Logger,
} from 'winston';

export interface ILogger extends Logger {
  info: any;
}

export interface ILoggerService {
  create(): ILogger;
}

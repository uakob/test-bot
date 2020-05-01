import {
  Fn,
  Param,
} from './../../blackboard';

export enum EBotState {
  WORKING = 'WORKING',
  IDLE = 'IDLE',
  ZOMBIE = 'ZOMBIE',
  DEAD = 'DEAD',
  PAUSED = 'PAUSED',
}

export enum EBotType {
  'REGULAR',
  'TEST',
}

export interface IBot {
  start(): Promise<void>;
  stop(): Promise<void>;
  pause(): Promise<void>;
  getState(): Promise<EBotState>;
  getAction(name: string): Fn;
  getParam(name: string): Param;
}

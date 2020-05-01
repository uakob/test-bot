export enum ELoopState {
  'RUNNING',
  'PAUSED',
  'STOPPED',
}

/**
 * WE DO NOT NEED global update,
 * and this is interface for bot
 * exactly ONLY for conventions and DI
 *
 * Bot Loop MUST to be time agnostic
 * because it stimulates only for doing unit of work
 * at one iteration of tree walking
 * and this ONLY the reason to implement loop
 *
 * TODO: implement throws some errors at a start
 */
export interface ILoop {
  start(): any;
  stop(): any;
  status(): Promise<ELoopState>;
}

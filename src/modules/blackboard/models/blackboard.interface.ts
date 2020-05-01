import {
  IBot,
} from '../../bot';

export type Types = boolean | string | number | Array<any>;

export type IFunctions = Map<string, Fn>;

export type Fn = (blackboard? : IBlackboard) => Promise<boolean>;

export type Param = (blackboard? : IBlackboard) => Promise<Types>;

export type IParams = Map<string, Param>;

export interface Data {
  [key: string]: Types | Data;
}

export interface IBlackboard {
  functions: IFunctions;
  params: IParams;
  getFn(name: string): Fn;
  getParam(name: string): Param;
  init(): Promise<void>;
  attach(bot: IBot): Promise<void>;
  data: Data;
}

export default IBlackboard;

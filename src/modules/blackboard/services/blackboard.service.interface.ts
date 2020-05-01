import {
  IBlackboard,
} from '../models';

export interface IBlackboardService {
  init(): Promise<void>;
  create(): Promise<IBlackboard>;
}

export default IBlackboardService;

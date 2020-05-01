import {
  ISetting,
  ISettingKey,
  ISettingValue,
} from '../models';

export interface ISettingsStore {
  [key: string]: ISettingValue;
}

export interface ISettingsService {
  get(botName: string): Promise<any>;
  set(botName: string, settings: ISettingsStore): Promise<boolean>;
}

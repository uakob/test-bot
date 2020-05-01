import { Document } from 'mongoose';

export type ISettingKey = string;
export type ISettingValue = string | number | boolean;

export interface ISettingBase {
  owner: string;
  reCheckTime: number;
  reCheckTreshold: number;
  requestTimeMinutes: number;
  orderMaxSum: number;
  resolutionid: number;
}

export interface ISetting extends ISettingBase, Document {}

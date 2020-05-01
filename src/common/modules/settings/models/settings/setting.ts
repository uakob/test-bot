import * as mongoose from 'mongoose';

import {
  ISettingKey,
  ISettingValue,
} from './setting.interface';

// tslint:disable-next-line:variable-name
export const Setting = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.String,
  },
  reCheckTime: {
    type: mongoose.Schema.Types.Number,
  },
  reCheckTreshold: {
    type: mongoose.Schema.Types.Number,
  },
  requestTimeMinutes: {
    type: mongoose.Schema.Types.Number,
  },
  orderMaxSum: {
    type: mongoose.Schema.Types.Number,
  },
  resolutionid: {
    type: mongoose.Schema.Types.Number,
  },
});

import * as Joi from 'joi';
import * as dotenv from 'dotenv';

import * as _ from 'lodash';

import {
  Model,
} from 'mongoose';

import {
  Injectable,
} from '@nestjs/common';

import {
  InjectModel,
} from '@nestjs/mongoose';

import * as config from 'config';

import {
  Setting,
  ISetting,
  ISettingBase,
  ISettingValue,
  ISettingKey,
} from '../models';

import {
  appConfig as appSchema,
} from '../schemas';

import {
  ISettingsService,
  ISettingsStore,
} from './settings.service.interface';

// TODO: refactor this peace of shit

@Injectable()
export class SettingsService implements ISettingsService {
  constructor(
    @InjectModel('Setting')
    private readonly settingsModel: Model<ISetting>,
  ) {}

  public async init(): Promise<void> {
    // const settings = await this.settingsModel.find().exec();

    // TODO: implement real in-memory settings with persisting to mongo
    return;
  }

  public async get(botName: string): Promise<any> {
    const settings = await this.settingsModel
      .findOne({ owner: botName }).exec();

    return settings;
  }

  public async set(botName: string, settings: ISettingsStore): Promise<boolean> {
    const result = await this.settingsModel
        .update({ owner: botName }, settings, { upsert: true })
        .exec();

    return true;
  }
}

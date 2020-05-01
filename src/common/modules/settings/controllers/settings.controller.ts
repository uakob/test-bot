import {
  Controller,
  Post,
  Patch,
  Get,
  Inject,
  Param,
  Body,
  ValidationPipe,
} from '@nestjs/common';

import {
  COMMON_DI_CONSTANTS,
} from '../../../common_di_constants';

import {
  ISettingsService,
  ISettingsStore,
} from '../services';

import {
  ISetting,
  ISettingKey,
  ISettingValue,
  ISettingBase,
} from '../models';

@Controller('settings')
export class SettingsController {
  private readonly settingsService: ISettingsService;

  constructor(
    @Inject(COMMON_DI_CONSTANTS.ISettingsService)
    settingsService: ISettingsService,
  ) {
    this.settingsService = settingsService;
  }

  @Post('/get')
  public async get(
    @Body('data') data: any,
  ): Promise<any> {
    try {
      const result = await this.settingsService.get(data.owner);
      return {
        success: 1,
        data: result,
      };
    } catch (error) {
      return {
        error,
        success: 0,
      };
    }
  }

  @Post('/set')
  public async set(
    @Body('data') data: any,
  ): Promise<any> {
    try {
      const result = await this.settingsService.set(data.name, data.values);

      return {
        success: 1,
        data: result,
      };
    } catch (error) {
      return {
        error,
        success: 0,
      };
    }
  }
}

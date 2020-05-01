import { Module } from '@nestjs/common';

import { APP_PIPE } from '@nestjs/core';

// import { MongooseModule } from '@nestjs/mongoose';

import {
  COMMON_DI_CONSTANTS,
  LoggerModule,
  ConfigModule,
  // SettingsModule,
  TracerModule,
  ValidationModule,
  IConfigRegistry,
  // SettingsService,
} from '../../common'; // TODO: @goods/common

import { DI_CONSTANTS } from '../../di_constants';

import { TreeModule } from './../tree';
import { BlackboardModule } from './../blackboard';
import { BotModule } from './../bot';

import { AppService } from './services';

import {
  AppController,
} from './controllers';

@Module({
  imports: [
    // MongooseModule.forRootAsync({
    //   useFactory: async (config: IConfigRegistry) => ({
    //     uri: `mongodb://${config.get('mongodb').uri}`,
    //   }),
    //   inject: [
    //     COMMON_DI_CONSTANTS.IConfig,
    //   ],
    // }),
    // SettingsModule,
    ConfigModule,
    LoggerModule,
    TracerModule,
    ValidationModule,
    TreeModule,
    BotModule,
    BlackboardModule,
  ],
  controllers: [
    AppController,
  ],
  providers: [
    {
      provide: DI_CONSTANTS.IAppService,
      useClass: AppService,
    },
    // {
    //   provide: COMMON_DI_CONSTANTS.ISettingsService,
    //   useClass: SettingsService,
    // },
  ],
})
export class AppModule {}

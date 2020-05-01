import {
  Module,
  Global,
} from '@nestjs/common';

import {
  MongooseModule,
} from '@nestjs/mongoose';

import {
  COMMON_DI_CONSTANTS,
} from '../../common_di_constants';

import {
  Setting,
} from './models';

import {
  ISettingsService,
  SettingsService,
} from './services';

import {
  SettingsController,
} from './controllers';

@Global()
@Module({
  controllers: [
    SettingsController,
  ],
  providers: [
    {
      provide: COMMON_DI_CONSTANTS.ISettingsService,
      useClass: SettingsService,
    },
  ],
  exports: [
    COMMON_DI_CONSTANTS.ISettingsService,
  ],
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Setting',
        schema: Setting,
      },
    ]),
  ],
})

export class SettingsModule {}

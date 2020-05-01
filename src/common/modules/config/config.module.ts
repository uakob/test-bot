import {
  Module,
  Global,
} from '@nestjs/common';

import {
  COMMON_DI_CONSTANTS,
} from './../../common_di_constants';

import {
  Param,
} from './../../../modules/blackboard/models/blackboard.interface';

import {
  IConfigService,
  ConfigService,
} from './services';

import {
  ConfigController,
} from './controllers';

@Global()
@Module({
  controllers: [
    ConfigController,
  ],
  providers: [
    {
      provide: COMMON_DI_CONSTANTS.IConfigService,
      useValue: new ConfigService(),
    },
    {
      provide: COMMON_DI_CONSTANTS.IConfig,
      useFactory: (configService: IConfigService) => {
        return configService.getConfig();
      },
      inject: [
        COMMON_DI_CONSTANTS.IConfigService],
    },
  ],
  exports: [
    COMMON_DI_CONSTANTS.IConfigService,
    COMMON_DI_CONSTANTS.IConfig,
  ],
})

export class ConfigModule {}

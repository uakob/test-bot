import {
  Module,
} from '@nestjs/common';

import {
  ConfigModule,
  LoggerModule,
  TracerModule,
} from './../../common';

import {
  DI_CONSTANTS,
} from './../../di_constants';

import {
  TreeModule,
} from './../tree';

import {
  BlackboardModule,
} from './../blackboard';

import {
  BotService,
} from './services';

import {
  BotController,
} from './controllers';

@Module({
  imports: [
    ConfigModule,
    LoggerModule,
    TracerModule,
    TreeModule,
    BlackboardModule,
  ],
  controllers: [
    BotController,
  ],
  providers: [
    {
      provide: DI_CONSTANTS.IBotService,
      useClass: BotService,
    },
  ],
  exports: [
    DI_CONSTANTS.IBotService,
  ],
})
export class BotModule {}

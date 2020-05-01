import {
  Module,
} from '@nestjs/common';

import {
  LoggerModule,
  ConfigModule,
  TracerModule,
  ValidationModule,
} from '../../common'; // TODO: @goods/common

import {
  DI_CONSTANTS,
} from '../../di_constants';

import {
  BlackboardService,
} from './services';

@Module({
  imports: [
    ConfigModule,
    LoggerModule,
    TracerModule,
    ValidationModule,
  ],
  providers: [
    {
      provide: DI_CONSTANTS.IBlackboardService,
      useClass: BlackboardService,
    },
    {
      provide: DI_CONSTANTS.IBlackboard,
      useFactory: (blackboardService: BlackboardService) => {
        return blackboardService.create();
      },
      inject: [
        DI_CONSTANTS.IBlackboardService,
      ],
    },
  ],
  exports: [
    DI_CONSTANTS.IBlackboardService,
    DI_CONSTANTS.IBlackboard,
  ]
})
export class BlackboardModule {}

import {
  Module,
} from '@nestjs/common';

import {
  COMMON_DI_CONSTANTS,
  ConfigModule,
  LoggerModule,
  TracerModule,
  ILogger,
} from './../../common';

import {
  DI_CONSTANTS,
} from './../../di_constants';

import {
  BTree,
} from './models';

import {
  TreeService,
} from './services';

import {
  TreeController,
} from './controllers';

@Module({
  imports: [
    ConfigModule,
    LoggerModule,
    TracerModule,
  ],
  controllers: [
    TreeController,
  ],
  providers: [
    {
      provide: DI_CONSTANTS.IBTreeService,
      useClass: TreeService,
    },
    // {
    //   provide: DI_CONSTANTS.IBHMap,
    //   useFactory: async (
    //     treeService: TreeService,
    //     logger: ILogger,
    //   ) => {
    //     logger.debug('FACTORY IN USE');
    //     await treeService.init();
    //     return await treeService.get();
    //   },
    //   inject: [
    //     DI_CONSTANTS.IBTreeService,
    //     COMMON_DI_CONSTANTS.ILogger, // TODO: inject logger in all factories
    //   ],
    // },
  ],
  exports: [
    DI_CONSTANTS.IBTreeService,
    // DI_CONSTANTS.IBHMap,
  ],
})
export class TreeModule {}

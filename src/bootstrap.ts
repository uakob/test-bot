import {
  NestFactory,
  // APP_PIPE,
  // APP_INTERCEPTOR,
} from '@nestjs/core';

import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

import {
  COMMON_DI_CONSTANTS,
} from './common';
import {
  DI_CONSTANTS,
} from './di_constants';

import {
  AppModule,
} from './modules';

// import {
//   SettingsModule,
// } from './common/modules';

export async function bootstrap() {
  // TODO: ExceptionFilters
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    // {
    //   logger: false,
    // },
  );
  try {
    await app
      .select(AppModule)
      .get(DI_CONSTANTS.IAppService)
      .init();

    await app
      .select(AppModule)
      .get(DI_CONSTANTS.IBTreeService)
        .init();

    await app
      .select(AppModule)
      .get(DI_CONSTANTS.IBotService)
      .init();

    // const settingsService = await app
    //   .select(AppModule)
    //   .get(COMMON_DI_CONSTANTS.ISettingsService);

    // const settings = await app
    // .select(AppModule)
    // .get(COMMON_DI_CONSTANTS.ISettingsService)
    // .init();

    // await app
      // .select(AppModule)
      // .get(SettingsModule)
      // .get(COMMON_DI_CONSTANTS.ISettingsService)
      // .init();

    // await app.useLogger(app
    //   .select(AppModule)
    //   .get(COMMON_DI_CONSTANTS.ILoggerService));
    // await app.useLogger(app.get(COMMON_DI_CONSTANTS.ILoggerService));

    const port = await app
      .select(AppModule)
      .get(COMMON_DI_CONSTANTS.IConfig)
      .get('app.port');

    const host = await app
      .select(AppModule)
      .get(COMMON_DI_CONSTANTS.IConfig)
      .get('app.host');

    console.log(JSON.stringify({
      host,
      port,
    }));

    // app.useLogger(app.get(COMMON_DI_CONSTANTS.ILogger));
    // WARN: [winston] Unknown logger level: ConfigController {/Config}:

    // TODO: app.useGlobalPipes(new ValidationPipe());
    const tracerInterceptor = await app
    .select(AppModule)
    .get(COMMON_DI_CONSTANTS.ITracerInterceptor);

    const logger = await app
    .select(AppModule)
    .get(COMMON_DI_CONSTANTS.ILogger);

    await app.useGlobalInterceptors(tracerInterceptor);

    const validationPipe = await app
      .select(AppModule)
      .get(COMMON_DI_CONSTANTS.IValidationPipe);

    // TODO: refactor to injecting at ValidationModule itself
    // NOTE: or use global logger WE CAN'T cause it's another use case
    await app.useGlobalPipes(new validationPipe(logger));

    await app.listen(port, host);
  } catch (error) {
    throw error;
  }
  // NOTE: 0.0.0.0 needed, #see https://docs.nestjs.com/techniques/performance
}

const init = async () => {
  try {
    console.log('APP INIT START');
    await bootstrap();
    console.log('APP INIT SUCCEED');
  } catch (err) {
    console.log('APP INIT FAILURE');

    if (err.message === 'TREE_INIT_ERROR') {
      const restartTime = 10;
      console.log(JSON.stringify({
        errType: err.message,
        restartTime
      }));
      setTimeout(async () => {
        await init();
      }, restartTime * 1000);
    }
  }
};

init();

export default init;

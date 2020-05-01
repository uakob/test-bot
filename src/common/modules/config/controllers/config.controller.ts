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
} from './../../../common_di_constants';

import {
  IConfigService,
  IConfig,
} from './../services';

@Controller('config')
export class ConfigController {
  private readonly configService: IConfigService;

  constructor(
    @Inject(COMMON_DI_CONSTANTS.IConfigService)
    configService: IConfigService,
  ) {
    this.configService = configService;
  }

  @Get()
  public index(): IConfig {
    return this.configService.index();
  }

  @Get('/:key')
  public async get(
    @Param('key') key: string,
  ): Promise<any> {
    return this.configService.getAsync(key);
  }

  // @Patch('/:key')
  @Post('/:key') // NOTE: ??? separate
  public async set(
    @Param('key') key: string,
    @Body('value') value: string | number,
  ): Promise<any> {
    return this.configService.setAsync(key, value);
  }
}

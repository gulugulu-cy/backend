import { ILogger } from '@midwayjs/core/dist/interface';
import { Catch, Inject, MidwayHttpError } from '@midwayjs/core';

@Catch()
export class DefaultErrorFilter {
  @Inject()
  logger: ILogger;

  async catch(err: MidwayHttpError) {
    return {
      status: err.status ?? 500,
      message: 'error',
      data: err.message,
    };
  }
}

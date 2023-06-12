import { Catch, httpError, MidwayHttpError } from '@midwayjs/core';

@Catch(httpError.NotFoundError)
export class NotFoundFilter {
  async catch(err: MidwayHttpError) {
    return {
      message: err.message,
      code: 404,
    };
  }
}

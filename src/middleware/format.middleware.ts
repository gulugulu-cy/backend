import { NextFunction, Context } from '@midwayjs/koa';
import { Middleware, IMiddleware } from '@midwayjs/core';
import { convertPackageKeysToCamelCase } from '../util/util';

@Middleware()
export class FormatMiddleware implements IMiddleware<Context, NextFunction> {
  resolve() {
    return async (ctx: Context, next: NextFunction) => {
      const result = await next();
      return {
        code: 200,
        msg: 'success',
        data: convertPackageKeysToCamelCase(result),
      };
    };
  }
}

import { IJwt } from '../interface';
import { JwtService } from '@midwayjs/jwt';
import { ILogger } from '@midwayjs/logger';
import { Inject, Logger } from '@midwayjs/decorator';
import { NextFunction, Context } from '@midwayjs/koa';
import { UserService } from '../service/user.service';
import { Middleware, IMiddleware, Config } from '@midwayjs/core';
import { CustomHttpError, httpErrorCode } from '../error/CustomHttpError';

@Middleware()
export class JwtMiddleware implements IMiddleware<Context, NextFunction> {
  @Config('jwt')
  jwtConfig: IJwt;

  @Inject()
  jwt: JwtService;

  @Logger()
  logger: ILogger;

  resolve() {
    return async (ctx: Context, next: NextFunction) => {
      const authorization = ctx.get('Authorization');
      if (!authorization) {
        throw new CustomHttpError(httpErrorCode['MISSING_REQUIRED_HEADER']);
      }
      const token = authorization.split('Bearer ')[1];
      try {
        const tokenData = await this.jwt.verify(token, this.jwtConfig.secret);
        if (!tokenData) {
          throw new CustomHttpError(httpErrorCode['LOGIN_EXCEPTION']);
        }
        const { username, password } = tokenData as any;
        const userService = await ctx.requestContext.getAsync<UserService>(
          UserService
        );
        const user = await userService.findUserInfo(username, password);
        ctx.user = user;
        await next();
      } catch (error) {
        this.logger.error('jwt中间件错误捕获=====>', error);
        throw new CustomHttpError(httpErrorCode['LOGIN_EXCEPTION']);
      }
    };
  }

  ignore(ctx: Context): boolean {
    // 下面的路由将忽略此中间件
    return this.jwtConfig.ignore.includes(ctx.path);
  }
}

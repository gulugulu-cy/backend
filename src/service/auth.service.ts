import * as dayjs from 'dayjs';
import { IJwt } from '../interface';
import { Context } from '@midwayjs/koa';
import { JwtService } from '@midwayjs/jwt';
import { UserService } from './user.service';
import { CaptchaService } from '@midwayjs/captcha';
import { IUser } from '../interface/user.interface';
import { Config, Inject, Provide } from '@midwayjs/core';
import { ILogin, IToken } from '../interface/auth.interface';
import { CustomHttpError, httpErrorCode } from '../error/CustomHttpError';

@Provide()
export class AuthService {
  @Config('jwt')
  jwtConfig: IJwt;

  @Inject()
  ctx: Context;

  @Inject()
  jwt: JwtService;

  @Inject()
  captchaService: CaptchaService;

  @Inject()
  userService: UserService;

  public async login(params: ILogin): Promise<IToken> {
    const { username, password, captcha, id } = params;
    // 验证码校验
    if (captcha) {
      const passed: boolean = await this.captchaService.check(id, captcha);
      if (!passed) {
        throw new CustomHttpError(httpErrorCode['VERIFICATION_CODE_ERROR']);
      }
    }
    // 账号密码验证
    const user = await this.userService.findUserInfo(username, password);
    if (!user.id) {
      throw new CustomHttpError(httpErrorCode['ACCOUNT_PASSWORD_ERROR']);
    }
    return await this.generateToken(user);
  }

  public async refreshToken(token: string) {
    const { secret } = this.jwtConfig;
    const result = (await this.jwt.verify(token, secret)) as any;
    if (!result || result?.type !== 'refreshToken') {
      throw new CustomHttpError(httpErrorCode['LOGIN_EXCEPTION']);
    }
    const { username, password } = result;
    const user = await this.userService.findUserInfo(username, password);
    if (!user.id) {
      throw new CustomHttpError(httpErrorCode['LOGIN_EXCEPTION']);
    }
    return await this.generateToken(user);
  }

  public async generateToken(user: IUser): Promise<IToken> {
    const { secret, expiresIn } = this.jwtConfig;
    const exp = dayjs().add(2, 'h').unix();
    const accessToken = await this.jwt.sign(
      { ...user, type: 'accessToken' },
      secret,
      { expiresIn }
    );

    const refreshToken = await this.jwt.sign(
      { ...user, type: 'refreshToken' },
      secret,
      { expiresIn }
    );

    return { exp, user, accessToken, refreshToken };
  }
}

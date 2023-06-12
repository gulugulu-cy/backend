import { CaptchaService } from '@midwayjs/captcha';
import { ILogin } from '../interface/auth.interface';
import { AuthService } from '../service/auth.service';
import { Body, Controller, Get, Inject, Post } from '@midwayjs/core';

@Controller('/api/auth')
export class AuthController {
  @Inject()
  captchaService: CaptchaService;

  @Inject()
  authService: AuthService;

  @Get('/captcha')
  public async captcha() {
    const { id, imageBase64: captcha } = await this.captchaService.image({
      noise: 5,
      width: 120,
      height: 40,
    });
    return { id, captcha };
  }

  @Post('/login')
  public async Login(@Body() params: ILogin) {
    const result = await this.authService.login(params);
    return result;
  }

  @Post('/refreshToken')
  public async refreshToken(@Body('token') token: string) {
    const result = await this.authService.refreshToken(token);
    return result;
  }
}

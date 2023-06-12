import { IUser } from './user.interface';

export interface ILogin {
  username: string; // 用户名
  password: string; // 密码
  captcha?: string; // 验证码
  id?: string; // 验证码ID
}

export interface IAuth {
  username: string; // 用户名
  password: string; // 密码
  captcha?: string; // 验证码
  id?: string; // 验证码ID
}

export interface IToken {
  exp: number;
  user: IUser;
  accessToken: string;
  refreshToken: string;
}

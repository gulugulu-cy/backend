import { IUser } from './interface/user.interface';

export interface IHttpError {
  code: number;
  message: string;
}

export interface IJwt {
  secret: string;
  expiresIn: string;
  ignore: string[];
}

declare module '@midwayjs/koa/dist/interface' {
  interface Context {
    user: IUser;
  }
}

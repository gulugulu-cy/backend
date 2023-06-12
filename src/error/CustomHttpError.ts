import { IHttpError } from '../interface';
import { MidwayHttpError } from '@midwayjs/core';

export class CustomHttpError extends MidwayHttpError {
  constructor(error: IHttpError) {
    const { message, code } = error;
    super(message, code);
  }
}

export const httpErrorCode: { [key: string]: IHttpError } = {
  DATA_DOES_NOT_EXIST: { code: 400, message: '数据不存在' },

  LOGIN_EXCEPTION: { code: 401, message: '登录异常' },
  VERIFICATION_CODE_ERROR: { code: 401, message: '验证码错误' },
  ACCOUNT_PASSWORD_ERROR: { code: 401, message: '账号密码错误' },

  MISSING_REQUIRED_HEADER: { code: 406, message: '请求不可接受' },
};

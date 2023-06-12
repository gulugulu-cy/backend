import { join } from 'path';
import * as koa from '@midwayjs/koa';
import * as jwt from '@midwayjs/jwt';
import * as info from '@midwayjs/info';
import * as orm from '@midwayjs/typeorm';
import * as upload from '@midwayjs/upload';
import * as captcha from '@midwayjs/captcha';
import * as passport from '@midwayjs/passport';
import * as validate from '@midwayjs/validate';
import { Configuration, App } from '@midwayjs/core';
import { NotFoundFilter } from './filter/notfound.filter';
import { JwtMiddleware } from './middleware/jwt.middleware';
import { DefaultErrorFilter } from './filter/DefaultErrorFilter';
import { FormatMiddleware } from './middleware/format.middleware';

@Configuration({
  imports: [
    koa,
    orm,
    jwt,
    upload,
    captcha,
    validate,
    passport,
    {
      component: info,
      enabledEnvironment: ['local'],
    },
  ],
  importConfigs: [join(__dirname, './config')],
})
export class ContainerLifeCycle {
  @App()
  app: koa.Application;

  async onReady() {
    // add middleware
    this.app.useMiddleware([JwtMiddleware, FormatMiddleware]);
    // add filter
    this.app.useFilter([NotFoundFilter, DefaultErrorFilter]);
  }
}

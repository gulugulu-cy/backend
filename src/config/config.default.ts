import { MidwayConfig } from '@midwayjs/core';
import { join } from 'path';

export default {
  keys: '1684113440433_556',
  koa: {
    port: 7002,
  },
  jwt: {
    secret: '4cb3aaebae98bcae',
    expiresIn: '2h',
    ignore: ['/api/auth/captcha', '/api/auth/login'],
  },
  upload: {
    mode: 'file',
    fileSize: '10mb',
    // 扩展名白名单
    whitelist: ['.jpg', 'jpeg', 'png'],
    // 仅允许下面这些文件类型可以上传
    mimeTypeWhiteList: {
      '.jpeg': ['image/jpg', 'image/jpeg', 'image/png'],
    },
    tmpdir: join(__dirname, 'midway-upload-files-tmp'),
    cleanTimeout: 5 * 60 * 1000,
    base64: false,
    // 仅在匹配路径到 /api/upload 的时候去解析 body 中的文件信息
    match: /\/api\/upload/,
  },
  typeorm: {
    dataSource: {
      default: {
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: '123456',
        database: 'website',
        synchronize: false, // 如果第一次使用，不存在表，有同步的需求可以写 true，注意会丢数据
        logging: true,
        dateStrings: true,
        // 扫描形式
        entities: ['**/entity/*{.ts,.js}'],
        migrations: ['**/migration/*.ts'],
      },
    },
  },
} as MidwayConfig;

import { MidwayConfig } from '@midwayjs/core';

export default {
  keys: '1684113440433_556',
  koa: {
    port: 7002,
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
        entities: ['dist/entity/*.js'],
        migrations: ['dist/migration/*.js'],
      },
    },
  },
} as MidwayConfig;

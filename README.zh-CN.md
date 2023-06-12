# my_midway_project

## 快速入门

<!-- 在此次添加使用文档 -->

如需进一步了解，参见 [midway 文档][midway]。

### 本地开发

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

### 部署

```bash
$ npm start
```

### 内置指令

- 使用 `npm run lint` 来做代码风格检查。
- 使用 `npm test` 来执行单元测试。


[midway]: https://midwayjs.org


### 迁移
 创建迁移 `npm run create --table=CreateUser`
 执行迁移 `npm run db:test` 
 撤销迁移 `npm run revert:test` 

### pg类型
int, int2, int4, int8, smallint, integer, bigint, decimal, numeric, real, float, float4, float8, double precision, money, character varying, varchar, character, char, text, citext, hstore, bytea, bit, varbit, bit varying, timetz, timestamptz, timestamp, timestamp without time zone, timestamp with time zone, date, time, time without time zone, time with time zone, interval, bool, boolean, enum, point, line, lseg, box, path, polygon, circle, cidr, inet, macaddr, tsvector, tsquery, uuid, xml, json, jsonb, int4range, int8range, numrange, tsrange, tstzrange, daterange, geometry, geography
# zkID-service

## QuickStart

The app is developed by [Midway](https://midwayjs.org ). For more configuration, please refer to [Midway](https://midwayjs.org ).

### Database init

script location `sql/init.sql`

### other component config

The configuration file is  located in `src/config/config.{current env}.ts`

For example, the configuration file name is `config.local.ts` in development and `config.prod.ts` in deploy.

#### mysql

```typescript
export const orm = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'mysql user',
  password: 'mysql password',
  database: 'mysql database',
  synchronize: false,
  logging: true, // print sql
};
```



#### application internal config

```typescript
export const zCloak = {
  // worker
  worker: {
    // number of worker verify pass
    verifyPassNumber: 2,
  },
  // chain contract 
  scan: {
    // contract config
    contractConfigs: [
      {
        // chain to contract address mapping
        chainId: 1287,
        contract: {
   	      // contract address
          'ProofStorage': '',
          'SimpleAggregator': '',
          'ZcloakPoap': '',
        },
      },
    ],
  },
};
```




### Development

```bash
$ npm i
$ npm run dev
$ open http://localhost:7001/
```

### Deploy

```bash
$ npm start
$ curl https://zkid-service.zcloak.network/
```

```bash
$ npm stop
```

### npm scripts

- Use `npm run lint` to check code style.
- Use `npm test` to run unit test.


[midway]: https://midwayjs.org

import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';
import { loggers } from '@midwayjs/logger';
import { ResultVO } from '../util/ResultVO';

export type DefaultConfig = PowerPartial<EggAppConfig>;

export default (appInfo: EggAppInfo) => {
  const config = {} as DefaultConfig;

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1649903965423_1061';

  // add your config here
  config.middleware = [];

  config.midwayFeature = {
    // true 代表使用 midway logger
    // false 或者为空代表使用 egg-logger
    replaceEggLogger: true,
  };

  // cors
  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
  };

  // config.security = {
  //   csrf: false,
  // };

  // global error handler
  config.onerror = {
    all(err, ctx) {
      // 在此处定义针对所有响应类型的错误处理方法
      // 注意，定义了 config.all 之后，其他错误处理方法不会再生效
      loggers
        .getLogger('logger')
        .warn('url: %s, error is: %s', ctx.originalUrl, err);
      ctx.body = JSON.stringify(ResultVO.error(err.message));
      ctx.status = 500;
    },
  };

  return config;
};

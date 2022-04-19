/**
 * 这里加入这段是因为 egg 默认的安全策略，在 post 请求的时候如果不传递 token 会返回 403
 * 由于大部分新手用户不太了解这个机制，所以在本地和单测环境做了默认处理
 * 请注意，线上环境依旧会有该错误，需要手动开启
 * 如果想了解更多细节，请访问 https://eggjs.org/zh-cn/core/security.html#安全威胁-csrf-的防范
 */
export const security = {
  csrf: false,
};

/**
 * mongodb setting.
 */
export const mongoose = {
  client: {
    // uri: 'mongodb://localhost:27017/zCloak',
    uri: 'mongodb://192.168.31.47:27017/zCloak',
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      user: '',
      pass: '',
    },
  },
};

// task config
export const taskConfig = {
  // redis: 'redis://127.0.0.1:6379', //任务依赖redis，所以此处需要加一个redis
  prefix: 'zkID-service-task',
  defaultJobOptions: {
    repeat: {
      tz: 'Asia/Shanghai', // Task等参数里面设置的比如（0 0 0 * * *）本来是为了0点执行，但是由于时区不对，所以国内用户时区设置一下。
    },
  },
};

// local dev logger
export const logger = {
  consoleLevel: 'debug',
};

export const zCloak = {
  scanBlock: {
    defaultStartBlockNumber: '1340000',
    moonbeamAddress: 'http://45.32.73.14:40001/',
    contractAddress: [
      '0x72AcB0f573287B3eE0375964D220158cD18465cb',
      '0xC8e2409A0E15CBe517E178972855D486e7E881e1',
    ],
  },
};

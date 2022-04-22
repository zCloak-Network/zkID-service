import { App, Config, Configuration } from '@midwayjs/decorator';
import { ILifeCycle, IMidwayContainer } from '@midwayjs/core';
import { Application } from 'egg';
import { join } from 'path';
import * as typegoose from '@midwayjs/typegoose';
import { InjectEntityModel } from '@midwayjs/typegoose';
import * as swagger from '@midwayjs/swagger';
import { ReturnModelType } from '@typegoose/typegoose';
import { SysConfig } from './entity/SysConfig';
import { ObjUtils } from './util/ObjUtils';

@Configuration({
  imports: [typegoose, swagger],
  importConfigs: [join(__dirname, './config')],
  conflictCheck: true,
})
export class ContainerLifeCycle implements ILifeCycle {
  @App()
  app: Application;

  @InjectEntityModel(SysConfig)
  sysConfigModel: ReturnModelType<typeof SysConfig>;

  @Config('zCloak.workerNum')
  workerNum: number;

  async onReady(container: IMidwayContainer) {
    // init default config
    const sysConfig = await this.sysConfigModel
      .findOne({ propertyName: 'workerNum' })
      .exec();
    if (ObjUtils.isNull(sysConfig)) {
      const sc = new SysConfig();
      sc.propertyName = 'workerNum';
      sc.propertyVal = this.workerNum.toString();
      await this.sysConfigModel.create(sc);
    }
  }
}

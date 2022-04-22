import { Config, Provide } from '@midwayjs/decorator';
import { ReturnModelType } from '@typegoose/typegoose';
import { SysConfig } from '../entity/SysConfig';
import { InjectEntityModel } from '@midwayjs/typegoose';
import { ObjUtils } from '../util/ObjUtils';

@Provide()
export class SysConfigService {
  @Config('zCloak.workerNum')
  workerNum: number;

  @InjectEntityModel(SysConfig)
  sysConfigModel: ReturnModelType<typeof SysConfig>;

  async getSysConfig(propertyName: string) {
    const sysConfig = await this.sysConfigModel
      .findOne({ propertyName })
      .exec();
    if (ObjUtils.isNotNull(sysConfig)) {
      return sysConfig.propertyVal;
    }
    return this.workerNum;
  }
}

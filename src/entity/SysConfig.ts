import { EntityModel } from '@midwayjs/typegoose';
import { modelOptions, prop } from '@typegoose/typegoose';

@EntityModel()
@modelOptions({ schemaOptions: { collection: 'sys_configs' } })
export class SysConfig {
  @prop()
  propertyName: string;

  @prop()
  propertyVal: string;
}

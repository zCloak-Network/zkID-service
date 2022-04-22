import { EntityModel } from '@midwayjs/typegoose';
import { modelOptions, prop } from '@typegoose/typegoose';
import { BaseBlockInfo } from './BaseBlockInfo';

@EntityModel()
@modelOptions({ schemaOptions: { collection: 'canonicals' } })
export class Canonical extends BaseBlockInfo {
  @prop({ required: true })
  cOwner: string;

  @prop({ required: true })
  requestHash: string;

  @prop({ required: true })
  rootHash: string;
}

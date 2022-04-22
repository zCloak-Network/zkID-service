import { EntityModel } from '@midwayjs/typegoose';
import { modelOptions, prop } from '@typegoose/typegoose';
import { BaseBlockInfo } from './BaseBlockInfo';

@EntityModel()
@modelOptions({ schemaOptions: { collection: 'mint_poaps' } })
export class MintPoap extends BaseBlockInfo {
  @prop({ required: true })
  poapId: string;

  @prop({ required: true })
  who: string;

  @prop({ required: true })
  nftId: string;
}

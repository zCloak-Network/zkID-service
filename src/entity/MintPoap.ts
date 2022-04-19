import { EntityModel } from '@midwayjs/typegoose';
import { modelOptions, prop } from '@typegoose/typegoose';

@EntityModel()
@modelOptions({schemaOptions: {collection: 'mint_poaps'}})
export class MintPoap {
  // ====optional
  @prop()
  blockNumber: number;

  @prop()
  blockHash: string;

  @prop()
  transactionHash: string;

  // ====optional
  @prop({required: true})
  poapId: string;

  @prop({required: true})
  who: string;

  @prop({required: true})
  nftId: string;
}

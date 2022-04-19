import { EntityModel } from '@midwayjs/typegoose';
import { modelOptions, prop } from '@typegoose/typegoose';

@EntityModel()
@modelOptions({schemaOptions: {collection: 'canonicals'}})
export class Canonical {
  // ====optional
  @prop()
  blockNumber: number;

  @prop()
  blockHash: string;

  @prop()
  transactionHash: string;

  // ====optional

  @prop({required: true})
  cOwner: string;

  @prop({required: true})
  requestHash: string;

  @prop({required: true})
  rootHash: string;
}

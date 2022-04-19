import { EntityModel } from '@midwayjs/typegoose';
import { modelOptions, prop } from '@typegoose/typegoose';

@EntityModel()
@modelOptions({schemaOptions: {collection: 'verifyings'}})
export class Verifying {
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
  worker: string;

  @prop({required: true})
  outputHash: string;

  @prop({required: true})
  rootHash: string;

  @prop({required: true})
  attester: string;

  @prop({required: true})
  isPassed: boolean;

  @prop({required: true})
  calcResult: number[];
}

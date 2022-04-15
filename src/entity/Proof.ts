import { EntityModel } from '@midwayjs/typegoose';
import { modelOptions, prop } from '@typegoose/typegoose';

@EntityModel()
@modelOptions({ schemaOptions: { collection: 'proofs' } })
export class Proof {
  @prop({ required: true })
  dataOwner: string;

  @prop({ required: true })
  kiltAddress: string;

  @prop({ required: true })
  cTypeHash: string;

  @prop({ required: true })
  programHash: string;

  @prop({ required: true })
  fieldName: string;

  @prop({ required: true })
  proofCid: string;

  @prop({ required: true })
  expectResult: boolean;

  @prop({ required: true })
  date: Date;

  @prop({ required: true })
  rootHash: string;
}

import { EntityModel } from '@midwayjs/typegoose';
import { modelOptions, prop, Severity } from '@typegoose/typegoose';
import { BaseBlockInfo } from './BaseBlockInfo';

@EntityModel()
@modelOptions({
  schemaOptions: {
    collection: 'proofs',
  },
  options: {
    allowMixed: Severity.ALLOW,
  },
})
export class Proof extends BaseBlockInfo {
  @prop({ required: true })
  dataOwner: string;

  @prop({ required: true })
  attester: string;

  @prop({ required: true })
  cType: string;

  @prop({ required: true })
  programHash: string;

  @prop({ required: true })
  fieldNames: string[];

  @prop({ required: true })
  proofCid: string;

  @prop({ required: true })
  requestHash: string;

  @prop({ required: true })
  rootHash: string;

  @prop({ required: true })
  expectResult: number[];
}

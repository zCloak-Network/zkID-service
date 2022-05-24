import { EntityModel } from '@midwayjs/typegoose';
import { modelOptions, prop, Severity } from '@typegoose/typegoose';
import { BaseBlockInfo } from './BaseBlockInfo';

@EntityModel()
@modelOptions({
  schemaOptions: { collection: 'verifyings' },
  options: {
    allowMixed: Severity.ALLOW,
  },
})
export class Verifying extends BaseBlockInfo {
  @prop({ required: true })
  cOwner: string;

  @prop({ required: true })
  requestHash: string;

  @prop({ required: true })
  worker: string;

  @prop({ required: true })
  outputHash: string;

  @prop({ required: true })
  rootHash: string;

  @prop({ required: true })
  attester: string;

  @prop({ required: true })
  isPassed: boolean;

  @prop({ required: true })
  calcResult: number[];
}

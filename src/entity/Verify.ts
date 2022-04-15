import { EntityModel } from '@midwayjs/typegoose';
import { modelOptions, prop } from '@typegoose/typegoose';

@EntityModel()
@modelOptions({ schemaOptions: { collection: 'verifys' } })
export class Verify {
  @prop({ required: true })
  dataOwner: string;

  @prop({ required: true })
  cTypeHash: string;

  @prop({ required: true })
  programHash: string;

  @prop({ required: true })
  isPassed: boolean;
}

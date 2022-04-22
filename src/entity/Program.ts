import { EntityModel } from '@midwayjs/typegoose';
import { modelOptions, prop } from '@typegoose/typegoose';

@EntityModel()
@modelOptions({ schemaOptions: { collection: 'programs' } })
export class Program {
  @prop({ required: true })
  programHash: string;

  @prop({ required: true })
  programDetail: string;

  @prop({ required: true })
  cTypeHash: string;

  @prop({ required: true })
  programFieldName: string;

  @prop({ required: true })
  programHashName: string;
}

import { EntityModel } from '@midwayjs/typegoose';
import { modelOptions, prop } from '@typegoose/typegoose';

@EntityModel()
@modelOptions({ schemaOptions: { collection: 'transfers' } })
export class Transfer {
  @prop({ required: true })
  tokenAddress: string;

  @prop({ required: true })
  from: string;

  @prop({ required: true })
  to: string;

  @prop({ required: true })
  amount: string;

  @prop({ required: true })
  programHash: string;

  @prop({ required: true })
  tranferTime: Date;
}

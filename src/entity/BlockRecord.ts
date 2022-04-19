import { prop } from '@typegoose/typegoose';

// @EntityModel()
// @modelOptions({ schemaOptions: { collection: 'block_records' } })
export class BlockRecord {
  @prop({ required: true })
  blockNumber: string;

  @prop({ required: true })
  blockTime: Date;
}

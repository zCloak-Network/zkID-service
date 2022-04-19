import { prop } from '@typegoose/typegoose';

// @EntityModel()
// @modelOptions({ schemaOptions: { collection: 'worker_results' } })
export class WorkerResult {
  @prop({ required: true })
  dataOwner: string;

  @prop({ required: true })
  worker: string;

  @prop({ required: true })
  rootHash: string;

  @prop({ required: true })
  isPassed: boolean;
}

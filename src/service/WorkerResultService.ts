import { Provide } from '@midwayjs/decorator';
import { ReturnModelType } from '@typegoose/typegoose';
import { WorkerResult } from '../entity/WorkerResult';
import { InjectEntityModel } from '@midwayjs/typegoose';

@Provide()
export class WorkerResultService {
  @InjectEntityModel(WorkerResult)
  workerResultModel: ReturnModelType<typeof WorkerResult>;

  async save(workerResult: WorkerResult) {
    await this.workerResultModel.create(workerResult);
  }
}

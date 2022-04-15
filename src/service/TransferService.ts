import { Provide } from '@midwayjs/decorator';
import { ReturnModelType } from '@typegoose/typegoose';
import { Transfer } from '../entity/Transfer';
import { InjectEntityModel } from '@midwayjs/typegoose';

@Provide()
export class TransferService {
  @InjectEntityModel(Transfer)
  transferModel: ReturnModelType<typeof Transfer>;

  async save(transfer: Transfer) {
    await this.transferModel.create(transfer);
  }
}

import { Config, Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/typegoose';
import { BlockRecord } from '../entity/BlockRecord';
import { ReturnModelType } from '@typegoose/typegoose';
import { isEmpty } from '../util/arrUtils';

@Provide()
export class BlockRecordService {
  @Config('zCloak.scanBlock.defaultStartBlockNumber')
  defaultStartBlockNumber: string;

  @InjectEntityModel(BlockRecord)
  blockRecordModel: ReturnModelType<typeof BlockRecord>;

  async save(blockNumber: string) {
    await this.blockRecordModel.create({
      blockNumber,
      blockTime: new Date(),
    });
  }

  async getLastScanBlockNumber() {
    const blockRecord = await this.blockRecordModel
      .find({})
      .sort({ blockNumber: -1 })
      .limit(1)
      .exec();
    if (!isEmpty(blockRecord)) {
      return blockRecord[0].blockNumber;
    }
    return this.defaultStartBlockNumber;
  }
}

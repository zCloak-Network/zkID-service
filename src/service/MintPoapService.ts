import { Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { MintPoap } from '../entity/MintPoap';

@Provide()
export class MintPoapService {
  @InjectEntityModel(MintPoap)
  mintPoapModel: ReturnModelType<typeof MintPoap>;

  async getByWho(who: string) {
    return await this.mintPoapModel.findOne({ who }).exec();
  }
}

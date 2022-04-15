import { Provide } from '@midwayjs/decorator';
import { ReturnModelType } from '@typegoose/typegoose';
import { Verify } from '../entity/Verify';
import { InjectEntityModel } from '@midwayjs/typegoose';

@Provide()
export class VerifyService {
  @InjectEntityModel(Verify)
  verifyModel: ReturnModelType<typeof Verify>;

  async save(verify: Verify) {
    await this.verifyModel.create(verify);
  }
}

import { Provide } from '@midwayjs/decorator';
import { ReturnModelType } from '@typegoose/typegoose';
import { Proof } from '../entity/Proof';
import { InjectEntityModel } from '@midwayjs/typegoose';

@Provide()
export class ProofService {
  @InjectEntityModel(Proof)
  proofModel: ReturnModelType<typeof Proof>;

  async save(proof: Proof) {
    await this.proofModel.create(proof);
  }
}

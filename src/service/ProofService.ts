import { Provide } from '@midwayjs/decorator';
import { ReturnModelType } from '@typegoose/typegoose';
import { Proof } from '../entity/Proof';
import { InjectEntityModel } from '@midwayjs/typegoose';
import { Verifying } from '../entity/Verifying';
import { isEmpty } from '../util/arrUtils';

@Provide()
export class ProofService {
  @InjectEntityModel(Proof)
  proofModel: ReturnModelType<typeof Proof>;

  @InjectEntityModel(Verifying)
  verifyingModel: ReturnModelType<typeof Verifying>;

  async getAttestResult(rootHash: string) {
    const proofResult = await this.proofModel.aggregate([
      {$match: {rootHash}},
      {
        $lookup: {
          from: "verifyings",
          localField: "rootHash",
          foreignField: "rootHash",
          as: "verifying"
        }
      },
    ]).exec();

    const verifiedResult = await this.verifyingModel.aggregate([
      {$match: {rootHash}},
      {
        $lookup: {
          from: "canonicals",
          localField: "outputHash",
          foreignField: "outputHash",
          as: "canonical"
        }
      },
    ]).exec();

    const finished = !isEmpty(verifiedResult) && !isEmpty(verifiedResult[0].canonical);
    const verified = !isEmpty(verifiedResult) && verifiedResult[0].isPassed;

    if (isEmpty(proofResult)) {
      return {};
    }

    return {
      ...proofResult[0],
      finished,
      verified
    };
  }

  async save(proof: Proof) {
    await this.proofModel.create(proof);
  }
}

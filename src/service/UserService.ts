import { Provide } from '@midwayjs/decorator';
import { ReturnModelType } from '@typegoose/typegoose';
import { Proof } from '../entity/Proof';
import { InjectEntityModel } from '@midwayjs/typegoose';
import { ArrUtils } from '../util/ArrUtils';
import { ObjUtils } from '../util/ObjUtils';
import { DateUtils } from '../util/DateUtils';
import { MintPoap } from '../entity/MintPoap';

@Provide()
export class UserService {
  @InjectEntityModel(Proof)
  proofModel: ReturnModelType<typeof Proof>;

  @InjectEntityModel(MintPoap)
  mintPoapModel: ReturnModelType<typeof MintPoap>;

  async listUserActivities(dataOwner: string) {
    const resultList = [];

    // proof
    const proofs = await this.proofModel
      .find({ dataOwner })
      .sort({
        blockTime: 1,
      })
      .exec();
    if (ArrUtils.isNotEmpty(proofs)) {
      for (const proof of proofs) {
        const obj: any = {};
        obj.operateType = 'Add proof';
        obj.transactionHash = proof.transactionHash;
        obj.time = ObjUtils.isNull(proof.blockTime)
          ? null
          : DateUtils.format(new Date(proof.blockTime * 1000));

        resultList.push(obj);
      }
    }

    // mint poap
    const mintPoaps = await this.mintPoapModel
      .find({ who: dataOwner })
      .sort({
        blockTime: 1,
      })
      .exec();
    if (ArrUtils.isNotEmpty(mintPoaps)) {
      for (const mintPoap of mintPoaps) {
        const obj: any = {};
        obj.operateType = 'Claim POAP';
        obj.transactionHash = mintPoap.transactionHash;
        obj.time = ObjUtils.isNull(mintPoap.blockTime)
          ? null
          : DateUtils.format(new Date(mintPoap.blockTime * 1000));

        resultList.push(obj);
      }
    }

    return resultList;
  }
}

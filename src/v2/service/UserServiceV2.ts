import { Inject, Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository } from 'typeorm';
import { ContractConfigGetter } from '../contract/ContractConfigGetter';
import { Proof } from '../entity/Proof';
import { ArrUtils } from '../../../../zkID-service-bak/src/util/ArrUtils';
import { DateUtils } from '../../../../zkID-service-bak/src/util/DateUtils';
import { Poap } from '../entity/Poap';

@Provide()
export class UserServiceV2 {
  @InjectEntityModel(Proof)
  proofRepository: Repository<Proof>;

  @InjectEntityModel(Poap)
  poapRepository: Repository<Poap>;

  @Inject()
  contractConfigGetter: ContractConfigGetter;

  async listUserActivities(dataOwner: string, chainId: number) {
    const resultList = [];

    // get proof
    const proofVersionId = await this.contractConfigGetter.getVersionIdByEntity(chainId, Proof);
    const proofs = await this.proofRepository.find({
      where: {
        dataOwner,
        versionId: proofVersionId,
      },
      order: {
        blockTime: 'desc',
      },
    });

    if (ArrUtils.isNotEmpty(proofs)) {
      for (const proof of proofs) {
        const obj: any = {};
        obj.operateType = 'Add proof';
        obj.transactionHash = proof.transactionHash;
        obj.time = DateUtils.formatTimestampToStr(proof.blockTime * 1000);

        resultList.push(obj);
      }
    }

    // get poap
    const poapVersionId = await this.contractConfigGetter.getVersionIdByEntity(chainId, Poap);
    const poaps = await this.poapRepository.find({
      where: {
        who: dataOwner,
        versionId: poapVersionId,
      },
      order: {
        blockTime: 'desc',
      },
    });

    if (ArrUtils.isNotEmpty(poaps)) {
      for (const poap of poaps) {
        const obj: any = {};
        obj.operateType = 'Claim POAP';
        obj.transactionHash = poap.transactionHash;
        obj.time = DateUtils.formatTimestampToStr(poap.blockTime * 1000);

        resultList.push(obj);
      }
    }

    return resultList;
  }
}

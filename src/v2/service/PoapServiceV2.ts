import { Inject, Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository } from 'typeorm';
import { ContractConfigGetter } from '../contract/ContractConfigGetter';
import { Poap } from '../entity/Poap';

@Provide()
export class PoapServiceV2 {
  @InjectEntityModel(Poap)
  poapRepository: Repository<Poap>;

  @Inject()
  contractConfigGetter: ContractConfigGetter;

  async getByWho(who: string, chainId: number) {
    const poapVersionId = await this.contractConfigGetter.getVersionIdByEntity(chainId, Poap);
    return await this.poapRepository.findOneBy({who, versionId: poapVersionId});
  }
}

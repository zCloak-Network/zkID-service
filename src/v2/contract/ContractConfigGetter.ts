import { Inject, Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository } from 'typeorm';
import { ObjUtils } from '../../util/ObjUtils';
import { ContractConfig } from '../entity/ContractConfig';

@Provide()
export class ContractConfigGetter {
  @Inject('entityContractNameMap')
  entityContractNameMap: Map<any, string>;

  @Inject('chainIdContractConfigMap')
  chainIdContractConfigMap: Map<string, any>;

  @InjectEntityModel(ContractConfig)
  contractConfigRepository: Repository<ContractConfig>;

  async getVersionIdByEntity<T>(chainId: number, cla: {new(...args: any[]): T}) {
    const contractName = this.entityContractNameMap.get(cla);
    const contractConfig = this.chainIdContractConfigMap.get(chainId.toString());
    // contract address
    const contractAddress = contractConfig[contractName];

    const config = await this.contractConfigRepository.findOneBy({
      chainId,
      contractAddress,
    });

    return ObjUtils.isNotNull(config) ? config.id : 0;
  }

}

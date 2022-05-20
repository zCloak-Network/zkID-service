import { EntityModel } from '@midwayjs/orm';
import { Column } from "typeorm";
import { BaseEntity } from './BaseEntity';

@EntityModel("contract_config")
export class ContractConfig extends BaseEntity{
  @Column({ name: "chain_id" })
  chainId: number;

  @Column({ name: "contract_address" })
  contractAddress: string;
}

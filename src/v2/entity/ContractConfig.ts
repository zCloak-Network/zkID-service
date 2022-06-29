import { EntityModel } from '@midwayjs/orm';
import { Column } from 'typeorm';
import { BaseEntity } from './BaseEntity';

@EntityModel('contract_config')
export class ContractConfig extends BaseEntity {
  @Column({
    name: 'chain_id',
    type: 'int',
    nullable: false,
    comment: 'the id of chain',
  })
  chainId: number;

  @Column({
    name: 'contract_address',
    type: 'varchar',
    nullable: false,
    comment: 'contract address',
  })
  contractAddress: string;
}

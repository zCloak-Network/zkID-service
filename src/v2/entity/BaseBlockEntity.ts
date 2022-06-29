import { Column } from 'typeorm';
import { BaseEntity } from './BaseEntity';

export abstract class BaseBlockEntity extends BaseEntity {
  @Column({
    name: 'block_number',
    type: 'int',
    nullable: false,
    comment: 'the number of block number',
  })
  blockNumber: number;

  @Column({
    name: 'block_hash',
    type: 'varchar',
    nullable: false,
    comment: 'the hash of block',
  })
  blockHash: string;

  @Column({
    name: 'block_time',
    type: 'int',
    nullable: false,
    comment: 'block time',
  })
  blockTime: number;

  @Column({
    name: 'transaction_hash',
    type: 'varchar',
    nullable: false,
    comment: 'the hash of transaction',
  })
  transactionHash: string;

  @Column({
    name: 'version_id',
    type: 'int',
    nullable: false,
    comment: 'the version of data',
  })
  versionId: number;
}

import { Column } from 'typeorm';
import { BaseEntity } from './BaseEntity';

export abstract class BaseBlockEntity extends BaseEntity{
  @Column({name: 'block_number'})
  blockNumber: number;

  @Column({name: 'block_hash'})
  blockHash: string;

  @Column({name: 'block_time'})
  blockTime: number;

  @Column({name: 'transaction_hash'})
  transactionHash: string;

  @Column({name: 'version_id'})
  versionId: number;
}

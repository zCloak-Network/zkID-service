import { EntityModel } from '@midwayjs/orm';
import { Column } from 'typeorm';
import { Contract } from '../contract/Contract';
import { BaseBlockEntity } from './BaseBlockEntity';

@Contract({ name: 'SimpleAggregator' })
@EntityModel({ name: 'raw_scan_verifying' })
export class Verifying extends BaseBlockEntity {
  @Column({
    name: 'data_owner_hex',
    type: 'varchar',
    nullable: false,
    comment: 'user address',
  })
  dataOwner: string;

  @Column({
    name: 'request_hash',
    type: 'varchar',
    nullable: false,
    comment: 'the hash of cTypeHash, fieldsNames, programHash, attester',
  })
  requestHash: string;

  @Column({
    name: 'worker',
    type: 'varchar',
    nullable: false,
    comment: 'the address of verifying worker',
  })
  worker: string;

  @Column({
    name: 'output_hash',
    type: 'varchar',
    nullable: false,
    comment: 'the hash of rootHash, calcOutput, isPassed, attester',
  })
  outputHash: string;

  @Column({
    name: 'root_hash',
    type: 'varchar',
    nullable: false,
    comment: 'the hash of kilt credential',
  })
  rootHash: string;

  @Column({
    name: 'attester',
    type: 'varchar',
    nullable: false,
    comment: 'kilt attester address',
  })
  attester: string;

  @Column({
    name: 'is_passed',
    type: 'tinyint',
    nullable: false,
    comment: 'the verifying result of worker',
  })
  isPassed: boolean;

  @Column({
    name: 'calc_result',
    type: 'json',
    nullable: false,
    comment: 'the calculation result of worker',
  })
  calcResult: number[];
}

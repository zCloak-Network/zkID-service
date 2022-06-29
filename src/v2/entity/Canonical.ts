import { EntityModel } from '@midwayjs/orm';
import { Column } from 'typeorm';
import { Contract } from '../contract/Contract';
import { BaseBlockEntity } from './BaseBlockEntity';

@Contract({ name: 'SimpleAggregator' })
@EntityModel({ name: 'raw_scan_canonical' })
export class Canonical extends BaseBlockEntity {
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
    name: 'output_hash',
    type: 'varchar',
    nullable: false,
    comment: 'the hash of rootHash, calcOutput, isPassed, attester',
  })
  outputHash: string;
}

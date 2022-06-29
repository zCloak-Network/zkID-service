import { EntityModel } from '@midwayjs/orm';
import { Column } from 'typeorm';
import { Contract } from '../contract/Contract';
import { BaseBlockEntity } from './BaseBlockEntity';

@Contract({ name: 'ProofStorage' })
@EntityModel({ name: 'raw_scan_proof' })
export class Proof extends BaseBlockEntity {
  @Column({
    name: 'data_owner_hex',
    type: 'varchar',
    nullable: false,
    comment: 'user address',
  })
  dataOwner: string;

  @Column({
    name: 'attester',
    type: 'varchar',
    nullable: false,
    comment: 'kilt attester address',
  })
  attester: string;

  @Column({
    name: 'ctype_hash',
    type: 'varchar',
    nullable: false,
    comment: 'ctype hash',
  })
  cTypeHash: string;

  @Column({
    name: 'program_hash',
    type: 'varchar',
    nullable: false,
    comment: 'program hash',
  })
  programHash: string;

  @Column({
    name: 'field_names',
    type: 'json',
    nullable: false,
    comment: 'program field names',
  })
  fieldNames: string[];

  @Column({
    name: 'proof_cid',
    type: 'varchar',
    nullable: false,
    comment: 'proof cid',
  })
  proofCid: string;

  @Column({
    name: 'request_hash',
    type: 'varchar',
    nullable: false,
    comment: 'the hash of cTypeHash, fieldsNames, programHash, attester',
  })
  requestHash: string;

  @Column({
    name: 'root_hash',
    type: 'varchar',
    nullable: false,
    comment: 'the hash of kilt credential',
  })
  rootHash: string;

  @Column({
    name: 'expect_result',
    type: 'json',
    nullable: false,
    comment: 'the expect result of program',
  })
  expectResult: number[];
}

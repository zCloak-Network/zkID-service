import { EntityModel } from '@midwayjs/orm';
import { Column } from 'typeorm';
import { Contract } from '../contract/Contract';
import { BaseBlockEntity } from './BaseBlockEntity';

@Contract({name: 'SimpleAggregator'})
@EntityModel({name: 'raw_scan_verifying'})
export class Verifying extends BaseBlockEntity {
  @Column({name: 'data_owner'})
  dataOwner: string;

  @Column({name: 'request_hash'})
  requestHash: string;

  @Column({name: 'worker'})
  worker: string;

  @Column({name: 'output_hash'})
  outputHash: string;

  @Column({name: 'root_hash'})
  rootHash: string;

  @Column({name: 'attester'})
  attester: string;

  @Column({name: 'is_passed'})
  isPassed: boolean;

  @Column({name: 'calc_result', type: 'json'})
  calcResult: number[];
}

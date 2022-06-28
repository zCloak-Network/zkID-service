import { EntityModel } from '@midwayjs/orm';
import { Column } from 'typeorm';
import { Contract } from '../contract/Contract';
import { BaseBlockEntity } from './BaseBlockEntity';

@Contract({name: 'SimpleAggregator'})
@EntityModel({name: 'raw_scan_canonical'})
export class Canonical extends BaseBlockEntity {
  @Column({name: 'data_owner_hex'})
  dataOwner: string;

  @Column({name: 'request_hash'})
  requestHash: string;

  @Column({name: 'output_hash'})
  outputHash: string;
}

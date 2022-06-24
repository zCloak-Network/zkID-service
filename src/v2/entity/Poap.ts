import { EntityModel } from '@midwayjs/orm';
import { Column } from 'typeorm';
import { Contract } from '../contract/Contract';
import { BaseBlockEntity } from './BaseBlockEntity';

@Contract({name: 'ZcloakPoap'})
@EntityModel({name: 'raw_scan_poap'})
export class Poap extends BaseBlockEntity {
  @Column({name: 'poap_id'})
  poapId: string;

  @Column({name: 'who_hex'})
  who: string;

  @Column({name: 'nft_id'})
  nftId: string;
}

import { EntityModel } from '@midwayjs/orm';
import { Column } from 'typeorm';
import { Contract } from '../contract/Contract';
import { BaseBlockEntity } from './BaseBlockEntity';

@Contract({ name: 'ZcloakPoap' })
@EntityModel({ name: 'raw_scan_poap' })
export class Poap extends BaseBlockEntity {
  @Column({
    name: 'poap_id',
    type: 'varchar',
    nullable: false,
    comment: 'the id of poap',
  })
  poapId: string;

  @Column({
    name: 'who_hex',
    type: 'varchar',
    nullable: false,
    comment: 'the address of poap owner',
  })
  who: string;

  @Column({
    name: 'nft_id',
    type: 'varchar',
    nullable: false,
    comment: 'the id of nft',
  })
  nftId: string;
}

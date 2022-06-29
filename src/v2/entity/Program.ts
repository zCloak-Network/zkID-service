import { EntityModel } from '@midwayjs/orm';
import { Column } from 'typeorm';
import { BaseEntity } from './BaseEntity';

@EntityModel({ name: 'program' })
export class Program extends BaseEntity {
  @Column({
    name: 'program_hash',
    type: 'varchar',
    nullable: false,
    comment: 'the hash of program',
  })
  programHash: string;

  @Column({
    name: 'program_field_name',
    type: 'varchar',
    nullable: false,
    comment: 'program field name',
  })
  programFieldName: string;

  @Column({
    name: 'program_name',
    type: 'varchar',
    nullable: false,
    comment: 'program name',
  })
  programName: string;
}

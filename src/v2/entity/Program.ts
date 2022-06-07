import { EntityModel } from '@midwayjs/orm';
import { Column } from 'typeorm';
import { BaseEntity } from './BaseEntity';

@EntityModel({name: 'program'})
export class Program extends BaseEntity{
  @Column({name: 'program_hash'})
  programHash: string;

  @Column({name: 'program_field_name'})
  programFieldName: string;

  @Column({name: 'program_name'})
  programName: string;
}

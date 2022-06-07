import { EntityModel } from '@midwayjs/orm';
import { Column } from 'typeorm';
import { BaseEntity } from './BaseEntity';

@EntityModel({name: 'ctype'})
export class CType extends BaseEntity {
  @Column({name: 'metadata', type: 'json'})
  metadata: IMetadata;

  @Column({name: 'ctype_hash'})
  ctypeHash: string;

  @Column({name: 'owner'})
  owner: string;
}

interface IMetadata {
  title: string;
  owner: string;
  description?: IMultilangLabel;
  properties: IMetadataProperties;
}

declare type IMetadataProperties = {
  [key: string]: IMultilangLabel;
};

interface IMultilangLabel {
  default: string;

  [key: string]: string;
}

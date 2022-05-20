import { EntityModel } from '@midwayjs/orm';
import { Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@EntityModel("block_record")
export class BlockRecord {
  @PrimaryGeneratedColumn({ name: "id" })
  id: number;

  @Column({ name: "block_number" })
  blockNumber: number;

  @Column({ name: "block_type" })
  blockType: string;

  // ===default column
  @CreateDateColumn()
  createTime: Date;

  @UpdateDateColumn()
  updateTime: Date;
}

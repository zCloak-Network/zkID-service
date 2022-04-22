import { prop } from '@typegoose/typegoose';

export class BaseBlockInfo {
  @prop()
  blockNumber: number;

  @prop()
  blockHash: string;

  /**
   * (s)
   */
  @prop()
  blockTime: number;

  @prop()
  transactionHash: string;
}

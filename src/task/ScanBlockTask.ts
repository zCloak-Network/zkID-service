import { Config, Inject, Provide, TaskLocal } from '@midwayjs/decorator';
import { ILogger } from '@midwayjs/logger';
import Web3 from 'web3';
import { TransactionReceipt } from 'web3-eth/types';
import { BlockRecordService } from '../service/BlockRecordService';
import { isEmpty } from '../util/arrUtils';
import { EventData } from '../event/EventData';
import { Proof } from '../entity/Proof';
import { ProofService } from '../service/ProofService';
import { WorkerResult } from '../entity/WorkerResult';
import { WorkerResultService } from '../service/WorkerResultService';
import { Verify } from '../entity/Verify';
import { VerifyService } from '../service/VerifyService';
import { Transfer } from '../entity/Transfer';
import { TransferService } from '../service/TransferService';
import { TokenProgramRule } from '../entity/TokenProgramRule';
import { TokenProgramRuleService } from '../service/TokenProgramRuleService';

@Provide()
export class ScanBlockTask {
  @Config('zCloak.scanBlock.moonbeamAddress')
  moonbeamAddress: string;

  @Config('zCloak.scanBlock.contractAddress')
  contractAddress: string[];

  @Inject()
  logger: ILogger;

  @Inject()
  blockRecordService: BlockRecordService;

  @Inject()
  proofService: ProofService;

  @Inject()
  workerResultService: WorkerResultService;

  @Inject()
  verifyService: VerifyService;

  @Inject()
  transferService: TransferService;

  @Inject()
  tokenProgramRuleService: TokenProgramRuleService;

  @Inject()
  web3: Web3;

  @TaskLocal('0 * * * * *')
  async scan() {
    this.logger.info('start scan moonbeam block task');

    const eventHashMap = this.convertEventToHashMap();

    // last number
    const lastScanBlockNumber =
      await this.blockRecordService.getLastScanBlockNumber();
    // now number
    const nowBlockNumber = await this.web3.eth.getBlockNumber();

    this.logger.debug('now block number %d', nowBlockNumber);

    // scan block
    // last number + 1
    for (let i = Number(lastScanBlockNumber) + 1; i < nowBlockNumber; i++) {
      this.logger.debug('current scan block number %s', i);

      const block = await this.web3.eth.getBlock(i, true);
      if (block && !isEmpty(block.transactions)) {
        // transaction
        for (const transaction of block.transactions) {
          if (
            !isEmpty(this.contractAddress) &&
            this.contractAddress.indexOf(transaction.hash)
          ) {
            const transactionReceipt =
              await this.web3.eth.getTransactionReceipt(transaction.hash);

            // parse data then save to db
            await this.parseReceiptForSave(eventHashMap, transactionReceipt);
          }
        }
      }

      // record block number
      await this.blockRecordService.save(nowBlockNumber.toString());
    }
  }

  private convertEventToHashMap() {
    const eventMap = new Map();
    EventData.forEach(item => {
      const key = this.web3.utils.keccak256(item.event);
      eventMap.set(key, {
        inputs: item.inputs,
        eventModel: item.eventModel,
      });
    });
    return eventMap;
  }

  private async parseReceiptForSave(
    eventHashMap: Map<any, any>,
    transactionReceipt: TransactionReceipt
  ) {
    if (!isEmpty(transactionReceipt.logs)) {
      for (const it of transactionReceipt.logs) {
        const tp = it.topics[0];
        const zCloakContract = eventHashMap.get(tp);
        if (zCloakContract) {
          let logData = this.web3.eth.abi.decodeLog(
            zCloakContract.inputs,
            it.data,
            it.topics
          );
          logData = JSON.parse(JSON.stringify(logData));
          switch (zCloakContract.eventModel) {
            case 'proofs': {
              this.logger.debug('proof save to database');

              const proof = this.buildProof(logData);
              await this.proofService.save(proof);
              break;
            }
            case 'worker_result_process': {
              this.logger.debug('worker_result_process save to database');

              const workerResult = this.buildWorkerResult(logData);
              await this.workerResultService.save(workerResult);
              break;
            }
            case 'worker_result_done': {
              this.logger.debug('worker_result_done save to database');

              const verify = this.buildVerify(logData);
              await this.verifyService.save(verify);
              break;
            }
            case 'token': {
              break;
            }
            case 'transfers': {
              this.logger.debug('transfers save to database');

              const transfer = this.buildTransfer(logData);
              await this.transferService.save(transfer);
              break;
            }
            case 'program': {
              break;
            }
            case 'token_program_rules': {
              this.logger.debug('save token_program_rules in database');

              const tokenProgramRule = this.buildTokenProgramRule(logData);
              await this.tokenProgramRuleService.save(tokenProgramRule);
              break;
            }
            default: {
              break;
            }
          }
        }
      }
    }
  }

  private buildProof(logData: any) {
    const proof = new Proof();

    proof.dataOwner = logData.dataOwner.toLowerCase();
    proof.kiltAddress = logData.kiltAddress.toLowerCase();
    proof.cTypeHash = logData.cType.toLowerCase();
    proof.programHash = logData.programHash.toLowerCase();
    proof.fieldName = logData.fieldName.toLowerCase();
    proof.proofCid = logData.proofCid;
    proof.rootHash = logData.rootHash.toLowerCase();
    proof.expectResult = logData.expectResult;
    proof.date = new Date();

    return proof;
  }

  private buildWorkerResult(logData: any) {
    const workerResult = new WorkerResult();

    workerResult.dataOwner = logData.dataOwner.toLowerCase();
    workerResult.worker = logData.worker.toLowerCase();
    workerResult.rootHash = logData.rootHash.toLowerCase();
    workerResult.isPassed = logData.isPassed;

    return workerResult;
  }

  private buildVerify(logData: any) {
    const verify = new Verify();

    verify.dataOwner = logData.dataOwner.toLowerCase();
    verify.cTypeHash = logData.cType.toLowerCase();
    verify.programHash = logData.programHash.toLowerCase();
    verify.isPassed = logData.isPassed;

    return verify;
  }

  private buildTransfer(logData: any) {
    const transfer = new Transfer();

    transfer.tokenAddress = logData.token.toLowerCase();
    transfer.from = logData.from.toLowerCase();
    transfer.to = logData.to.toLowerCase();
    transfer.amount = logData.amount;
    transfer.programHash = logData.programHash.toLowerCase();
    transfer.tranferTime = new Date();

    return transfer;
  }

  private buildTokenProgramRule(logData: any) {
    const tokenProgramRule = new TokenProgramRule();

    tokenProgramRule.tokenAddress = logData.token.toLowerCase();
    tokenProgramRule.checker = logData.checker.toLowerCase();
    tokenProgramRule.expectedResult = logData.expectedResult;
    tokenProgramRule.cTypeHash = logData.cType.toLowerCase();
    tokenProgramRule.programHash = logData.programHash.toLowerCase();

    return tokenProgramRule;
  }
}

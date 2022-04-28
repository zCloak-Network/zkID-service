import { Inject, Provide } from '@midwayjs/decorator';
import { ReturnModelType } from '@typegoose/typegoose';
import { Proof } from '../entity/Proof';
import { InjectEntityModel } from '@midwayjs/typegoose';
import { Verifying } from '../entity/Verifying';
import { Program } from '../entity/Program';
import { StrUtils } from '../util/StrUtils';
import { ArrUtils } from '../util/ArrUtils';
import { SysConfigService } from './SysConfigService';
import { DateUtils } from '../util/DateUtils';

@Provide()
export class ProofService {
  @InjectEntityModel(Proof)
  proofModel: ReturnModelType<typeof Proof>;

  @InjectEntityModel(Verifying)
  verifyingModel: ReturnModelType<typeof Verifying>;

  @InjectEntityModel(Program)
  programModel: ReturnModelType<typeof Program>;

  @Inject()
  sysConfigService: SysConfigService;

  async listUserProofProcess(dataOwner: string, programHash: string) {
    const proofWithVerifyingAndCTypes =
      await this.listProofWithVerifingAndCtype(dataOwner, programHash);

    const resultList = [];

    if (ArrUtils.isNotEmpty(proofWithVerifyingAndCTypes)) {
      for (const proofWithVerifyingAndCType of proofWithVerifyingAndCTypes) {
        const rootHash = proofWithVerifyingAndCType.rootHash;

        const item: any = {
          rootHash,
          proofCid: proofWithVerifyingAndCType.proofCid,
          expectResult: proofWithVerifyingAndCType.expectResult,
          cTypeHash: proofWithVerifyingAndCType.ctypes[0].ctypeHash,
          fieldNames: proofWithVerifyingAndCType.fieldNames.join(','),
          time: DateUtils.formatTimestampToStr(
            proofWithVerifyingAndCType.blockTime * 1000
          ),
        };

        // percent
        const percent = await this.getUserProofPercent(
          proofWithVerifyingAndCType.dataOwner,
          rootHash
        );

        // status
        const verifiedCanonicals = await this.getVerifiedCanonical(rootHash);
        const finished =
          this.getFinishedStatusFromVerifiedCanonical(verifiedCanonicals);
        const verified =
          this.getVerifiedStatusFromVerifiedCanonical(verifiedCanonicals);

        let status = null;
        if (verified) {
          status = 'Verified True';
        } else {
          status = 'Verified False';
        }

        if (!finished) {
          status = 'Verifing';
        }

        let programDetails = null;
        if (ArrUtils.isNotEmpty(proofWithVerifyingAndCType.programDetails)) {
          programDetails = proofWithVerifyingAndCType.programDetails[0];
        }

        const claimAlias = proofWithVerifyingAndCType.ctypes[0].metadata.title;

        item.percent = percent;
        item.status = status;
        item.programDetails = programDetails;
        item.claimAlias = claimAlias;

        // push
        resultList.push(item);
      }
    }

    return resultList;
  }

  getVerifiedStatusFromVerifiedCanonical(verifiedCanonicals: any[]) {
    return (
      ArrUtils.isNotEmpty(verifiedCanonicals) && verifiedCanonicals[0].isPassed
    );
  }

  getFinishedStatusFromVerifiedCanonical(verifiedCanonicals: any[]) {
    return (
      ArrUtils.isNotEmpty(verifiedCanonicals) &&
      ArrUtils.isNotEmpty(verifiedCanonicals[0].canonical)
    );
  }

  async getAttestResult(rootHash: string) {
    const proofResult = await this.proofModel
      .aggregate([
        { $match: { rootHash } },
        {
          $lookup: {
            from: 'verifyings',
            localField: 'rootHash',
            foreignField: 'rootHash',
            as: 'verifying',
          },
        },
      ])
      .exec();

    if (ArrUtils.isEmpty(proofResult)) {
      return {};
    }

    const verifiedCanonicals = await this.getVerifiedCanonical(rootHash);

    const finished =
      this.getFinishedStatusFromVerifiedCanonical(verifiedCanonicals);
    const verified =
      this.getVerifiedStatusFromVerifiedCanonical(verifiedCanonicals);

    return {
      ...proofResult[0],
      finished,
      verified,
    };
  }

  private async getVerifiedCanonical(rootHash: string) {
    return await this.verifyingModel
      .aggregate([
        { $match: { rootHash } },
        {
          $lookup: {
            from: 'canonicals',
            localField: 'outputHash',
            foreignField: 'outputHash',
            as: 'canonical',
          },
        },
      ])
      .exec();
  }

  async save(proof: Proof) {
    await this.proofModel.create(proof);
  }

  private async listProofWithVerifingAndCtype(
    dataOwner: string,
    programHash: string
  ) {
    const matchObj: any = {};
    matchObj.dataOwner = dataOwner;
    if (StrUtils.isNotEmpty(programHash)) {
      matchObj.programHash = programHash;
    }

    const pipelines = [
      {
        $match: { ...matchObj },
      },
      {
        $lookup: {
          from: 'verifyings',
          localField: 'rootHash',
          foreignField: 'rootHash',
          as: 'verifyings',
        },
      },
      {
        $lookup: {
          from: 'ctypes',
          localField: 'cTypeHash',
          foreignField: 'cTypeHash',
          as: 'ctypes',
        },
      },
      {
        $lookup: {
          from: 'programs',
          localField: 'programHash',
          foreignField: 'programHash',
          as: 'programDetails',
        },
      },
    ];

    return await this.proofModel.aggregate(pipelines).exec();
  }

  private async getUserProofPercent(dataOwner: string, rootHash: string) {
    const workerNum = await this.sysConfigService.getSysConfig('workerNum');

    const verifyings = await this.verifyingModel.find({
      dataOwner,
      rootHash,
    });
    const result = verifyings.length / Number(workerNum);
    return (result > 1 ? 1 : result).toFixed(2);
  }
}

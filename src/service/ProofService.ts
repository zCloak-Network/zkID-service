import { Config, Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { Canonical } from '../entity/Canonical';
import { Program } from '../entity/Program';
import { Proof } from '../entity/Proof';
import { Verifying } from '../entity/Verifying';
import { ArrUtils } from '../util/ArrUtils';
import { DateUtils } from '../util/DateUtils';
import { ObjUtils } from '../util/ObjUtils';
import { StrUtils } from '../util/StrUtils';

@Provide()
export class ProofService {
  @Config('zCloak.worker.verifyPassNumber')
  verifyPassNumber: number;

  @InjectEntityModel(Proof)
  proofModel: ReturnModelType<typeof Proof>;

  @InjectEntityModel(Verifying)
  verifyingModel: ReturnModelType<typeof Verifying>;

  @InjectEntityModel(Canonical)
  canonicalModel: ReturnModelType<typeof Canonical>;

  @InjectEntityModel(Program)
  programModel: ReturnModelType<typeof Program>;

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
        const percent = await this.getProofVerifyPercent(
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

  async getProofVerifyProcess(dataOwner: string, requestHash: string) {
    const proofWithVerifying = await this.getProofWithVerifying(dataOwner, requestHash);

    if (ObjUtils.isNull(proofWithVerifying)) {
      return {};
    }

    const canonicalWithVerifyings = await this.canonicalModel
      .aggregate([
        {
          $match: {cOwner: dataOwner, requestHash},
        },
        {
          $lookup: {
            from: 'verifyings',
            localField: 'outputHash',
            foreignField: 'outputHash',
            as: 'verifying',
          },
        },
        {
          $project: {
            cOwner: 1,
            requestHash: 1,
            outputHash: 1,
            verifying: {
              $filter: {
                input: '$verifying',
                as: 'item',
                cond: {
                  $and: [
                    {
                      $eq: ['$$item.cOwner', '$cOwner'],
                    },
                    {
                      $eq: ['$$item.requestHash', '$requestHash'],
                    },
                  ],
                },
              }
            },
          },
        },
        {
          $sort: {blockTime: 1}
        },
        {
          $limit: 1,
        },
      ])
      .exec();

    const finished = ArrUtils.isNotEmpty(canonicalWithVerifyings);
    const verified = finished && canonicalWithVerifyings[0].verifying[0].isPassed;

    return {
      ...proofWithVerifying,
      finished,
      verified,
    };
  }

  private async getProofWithVerifying(dataOwner: string, requestHash: string) {
    // 1.get proof
    const proofModel = await this.proofModel.findOne({dataOwner, requestHash})
      .sort({blockTime: 1})
      .exec();

    if (ObjUtils.isNull(proofModel)) {
      return null;
    }

    // 2.get verifying
    // 3.merge data
    const proof = proofModel.toObject();
    proof.verifying = await this.verifyingModel.find({requestHash, cOwner: dataOwner})
      .sort({blockTime: 1})
      .exec();

    return proof;
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

  async getProofVerifyPercent(dataOwner: string, rootHash: string) {
    const count = await this.verifyingModel.count({cOwner: dataOwner, rootHash}).exec();

    const needPassNumber = this.verifyPassNumber || 2;
    const result = count / needPassNumber;
    return (result > 1 ? 1 : result).toFixed(2);
  }

}

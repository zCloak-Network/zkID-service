import { Config, Inject, Provide } from '@midwayjs/decorator';
import { InjectEntityModel } from '@midwayjs/orm';
import { Repository } from 'typeorm';
import { ArrUtils } from '../../../../zkID-service-bak/src/util/ArrUtils';
import { DateUtils } from '../../../../zkID-service-bak/src/util/DateUtils';
import { ObjUtils } from '../../../../zkID-service-bak/src/util/ObjUtils';
import { ContractConfigGetter } from '../contract/ContractConfigGetter';
import { Canonical } from '../entity/Canonical';
import { CType } from '../entity/CType';
import { Program } from '../entity/Program';
import { Proof } from '../entity/Proof';
import { Verifying } from '../entity/Verifying';

@Provide()
export class ProofServiceV2 {
  @Config('zCloak.worker.verifyPassNumber')
  verifyPassNumber: number;

  @InjectEntityModel(Proof)
  proofRepository: Repository<Proof>;

  @InjectEntityModel(Verifying)
  verifyingRepository: Repository<Verifying>;

  @InjectEntityModel(Canonical)
  canonicalRepository: Repository<Canonical>;

  @InjectEntityModel(Program)
  programRepository: Repository<Program>;

  @InjectEntityModel(CType)
  cTypeRepository: Repository<CType>;

  @Inject()
  contractConfigGetter: ContractConfigGetter;

  async listUserProofProcess(dataOwner: string, programHash: string, chainId: number) {
    const resultList = [];

    // get proof
    const proofVersionId = await this.contractConfigGetter.getVersionIdByEntity(chainId, Proof);
    const proofs = await this.proofRepository.findBy({
      dataOwner,
      programHash,
      versionId: proofVersionId,
    });

    if (ArrUtils.isNotEmpty(proofs)) {
      for (const proof of proofs) {
        const cTypeHash = proof.cTypeHash;

        const item: any = {
          rootHash: proof.rootHash,
          proofCid: proof.proofCid,
          expectResult: proof.expectResult,
          cTypeHash,
          fieldNames: proof.fieldNames.join(','),
          time: DateUtils.formatTimestampToStr(proof.blockTime * 1000),
        };

        // percent
        const percent = await this.getProofVerifyPercent(
          proof.dataOwner,
          proof.requestHash,
          chainId,
        );

        // status
        const finished = await this.getProofVerifyFinishStatus(
          proof.dataOwner,
          proof.requestHash,
          chainId,
        );
        const verified = await this.getProofVerifyResult(
          proof.dataOwner,
          proof.requestHash,
          chainId,
        );

        let status = null;
        if (verified) {
          status = 'Verified True';
        } else {
          status = 'Verified False';
        }

        if (!finished) {
          status = 'Verifing';
        }

        // program
        const programDetails = await this.programRepository.findOneBy({programHash});

        // cType
        const cType = await this.cTypeRepository.findOneBy({ctypeHash: cTypeHash});

        const claimAlias = cType.metadata.title;

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

  async getProofVerifyProcess(dataOwner: string, requestHash: string, chainId: number) {
    const proofWithVerifying = await this.getProofWithVerifying(dataOwner, requestHash, chainId);

    if (ObjUtils.isNull(proofWithVerifying)) {
      return {};
    }

    const finished = await this.getProofVerifyFinishStatus(dataOwner, requestHash, chainId);
    const verified = await this.getProofVerifyResult(dataOwner, requestHash, chainId);

    return {
      ...proofWithVerifying,
      finished,
      verified,
    };
  }

  private async getProofWithVerifying(dataOwner: string, requestHash: string, chainId: number) {
    // 1.get proof
    const proofVersionId = await this.contractConfigGetter.getVersionIdByEntity(chainId, Proof);
    const proof = await this.proofRepository.findOneBy({
      dataOwner,
      requestHash,
      versionId: proofVersionId,
    });

    if (ObjUtils.isNull(proof)) {
      return null;
    }

    // 2.get verifying
    const verifyingVersionId = await this.contractConfigGetter.getVersionIdByEntity(chainId, Verifying);
    const verifyings = await this.verifyingRepository.find({
      where: {
        requestHash,
        dataOwner,
        versionId: verifyingVersionId,
      },
      order: {
        blockTime: 'desc',
      },
    });

    // 3.merge data
    (proof as any).verifying = verifyings

    return proof;
  }

  async getProofVerifyPercent(dataOwner: string, requestHash: string, chainId: number) {
    const verifyingVersionId = await this.contractConfigGetter.getVersionIdByEntity(chainId, Verifying);
    const count = await this.verifyingRepository.count({
      where: {
        dataOwner,
        requestHash,
        versionId: verifyingVersionId,
      },
    });

    const needPassNumber = this.verifyPassNumber || 2;
    const result = count / needPassNumber;
    return (result > 1 ? 1 : result).toFixed(2);
  }

  private async getProofVerifyFinishStatus(dataOwner: string, requestHash: string, chainId: number) {
    const canonicalVersionId = await this.contractConfigGetter.getVersionIdByEntity(chainId, Canonical);
    const count = await this.canonicalRepository.count({
      where: {
        dataOwner,
        requestHash,
        versionId: canonicalVersionId,
      },
    });

    return count > 0;
  }

  private async getProofVerifyResult(dataOwner: string, requestHash: string, chainId: number) {
    // get canonical
    const canonicalVersionId = await this.contractConfigGetter.getVersionIdByEntity(chainId, Canonical);
    const canonical = await this.canonicalRepository.findOneBy({
      dataOwner,
      requestHash,
      versionId: canonicalVersionId,
    });

    if (ObjUtils.isNull(canonical)) {
      return null;
    }

    // get verify result
    const verifyingVersionId = await this.contractConfigGetter.getVersionIdByEntity(chainId, Verifying);
    const verifying = await this.verifyingRepository.findOneBy({
      dataOwner,
      requestHash,
      versionId: verifyingVersionId,
      outputHash: canonical.outputHash,
    });

    return ObjUtils.isNotNull(verifying) && verifying.isPassed;
  }
}

import { Controller, Get, Inject, Provide, Query } from '@midwayjs/decorator';
import { CreateApiDoc } from '@midwayjs/swagger';
import { ProofService } from '../service/ProofService';
import { ResultResponse } from '../util/ResultResponse';

@Provide()
@Controller('/proof', {
  tagName: 'proof operate interface',
  description: 'v1',
})
export class ProofController {
  @Inject()
  proofService: ProofService;

  @CreateApiDoc()
    .summary('query proof attest result')
    .description('query proof attest result by rootHash')
    .param('data owner')
    .param('request hash')
    .respond(200, 'attest result', 'json', {
      example: {
        code: 200,
        data: {
          _id: '625a93dd966a3142dc1a9a87',
          blockNumber: 486,
          blockHash:
            '0x293fef764186bec208e9ea024149d5efddb9301f70b034328e02cedea8795c27',
          transactionHash:
            '0x1e47fa77df405e586c41fcf2619fdb996c1b6fbc1902c51167e28c544be42d6b',
          dataOwner: '0x5BF631060b226407A1353bcEef88e3f98aB722A8',
          attester:
            '0xa44986e16bbe80214b088e5833d42c84ba08f8baa5060e1067a9f5f87a60f25a',
          cType:
            '0xe21c5f437332f33db0e6f9cef958f2ff3fedfbcdeb60d4ff24db978b487aad1a',
          programHash:
            '0x0e8fbf57ffa900978d17b3c0a9025cc955a648baa8e760d3f38e22503473641d',
          fieldNames: [
            '6383461',
            '427020088179',
            '8271117968073418672650679055481',
            '30765223346328968342731846777',
            '9459527121954502519414720132217',
          ],
          proofCid: 'QmQbLced84EuYbfSax6UxmL8ZxajkUq66YR63f1AY1LvSi',
          requestHash:
            '0xa47cdbafddcbde5c9f532b3ac52e6e89ba9d98d51517b6875165b76d0e38796f',
          rootHash:
            '0xee9a2be93b0ff8d6a95159d40ab55ab5e3f1d44424296315723f3c7b87986aae',
          expectResult: [1],
          __v: 0,
          verifying: [
            {
              _id: '625a93dd966a3142dc1a9a8b',
              blockNumber: 487,
              blockHash:
                '0x9c31e26ff79032cab77c70a08919d1c0d538542952fa973014d8819043bffb71',
              transactionHash:
                '0x17a0cb05da7680b9afd6a4bccf4dedd26794764a6d6d23f0fb86752ca0aeb2a6',
              cOwner: '0x5BF631060b226407A1353bcEef88e3f98aB722A8',
              requestHash:
                '0xa47cdbafddcbde5c9f532b3ac52e6e89ba9d98d51517b6875165b76d0e38796f',
              worker: '0xdB0B665D36E3b68D77B72D0eC3B8349863C48218',
              outputHash:
                '0x36264a49e796c8fdb4caa3ab81aff4ea41c61e1cb47b05fef06bc9c96071bf01',
              rootHash:
                '0xee9a2be93b0ff8d6a95159d40ab55ab5e3f1d44424296315723f3c7b87986aae',
              attester:
                '0xa44986e16bbe80214b088e5833d42c84ba08f8baa5060e1067a9f5f87a60f25a',
              isPassed: true,
              calcResult: [1],
              __v: 0,
            },
            {
              _id: '625a93dd966a3142dc1a9a8f',
              blockNumber: 488,
              blockHash:
                '0x8f4fe975ab76584deaf151448ec749ec4124e8c94405b717f6633527f4b04889',
              transactionHash:
                '0x145df32ca30961bd7585fd8d1ae4a4970fedc836ea79648644038b150e2e749b',
              cOwner: '0x5BF631060b226407A1353bcEef88e3f98aB722A8',
              requestHash:
                '0xa47cdbafddcbde5c9f532b3ac52e6e89ba9d98d51517b6875165b76d0e38796f',
              worker: '0x2560b53FFa83BDfd65a64Eda9214BF50559C70F0',
              outputHash:
                '0x36264a49e796c8fdb4caa3ab81aff4ea41c61e1cb47b05fef06bc9c96071bf01',
              rootHash:
                '0xee9a2be93b0ff8d6a95159d40ab55ab5e3f1d44424296315723f3c7b87986aae',
              attester:
                '0xa44986e16bbe80214b088e5833d42c84ba08f8baa5060e1067a9f5f87a60f25a',
              isPassed: true,
              calcResult: [1],
              __v: 0,
            },
          ],
          finished: true,
          verified: true,
        },
      },
    })
    .build()
  @Get('/process')
  async getProofVerifyProcess(
    @Query('dataOwner') dataOwner: string,
    @Query('requestHash') requestHash: string,
  ) {
    const result = await this.proofService.getProofVerifyProcess(dataOwner, requestHash);
    return ResultResponse.success(result);
  }

  @CreateApiDoc()
    .summary('query proof attest result')
    .description('query proof attest result by rootHash')
    .param('rootHash')
    .respond(200, 'attest result', 'json', {
      example: {
        code: 200,
        data: {
          _id: '625a93dd966a3142dc1a9a87',
          blockNumber: 486,
          blockHash:
            '0x293fef764186bec208e9ea024149d5efddb9301f70b034328e02cedea8795c27',
          transactionHash:
            '0x1e47fa77df405e586c41fcf2619fdb996c1b6fbc1902c51167e28c544be42d6b',
          dataOwner: '0x5BF631060b226407A1353bcEef88e3f98aB722A8',
          attester:
            '0xa44986e16bbe80214b088e5833d42c84ba08f8baa5060e1067a9f5f87a60f25a',
          cType:
            '0xe21c5f437332f33db0e6f9cef958f2ff3fedfbcdeb60d4ff24db978b487aad1a',
          programHash:
            '0x0e8fbf57ffa900978d17b3c0a9025cc955a648baa8e760d3f38e22503473641d',
          fieldNames: [
            '6383461',
            '427020088179',
            '8271117968073418672650679055481',
            '30765223346328968342731846777',
            '9459527121954502519414720132217',
          ],
          proofCid: 'QmQbLced84EuYbfSax6UxmL8ZxajkUq66YR63f1AY1LvSi',
          requestHash:
            '0xa47cdbafddcbde5c9f532b3ac52e6e89ba9d98d51517b6875165b76d0e38796f',
          rootHash:
            '0xee9a2be93b0ff8d6a95159d40ab55ab5e3f1d44424296315723f3c7b87986aae',
          expectResult: [1],
          __v: 0,
          verifying: [
            {
              _id: '625a93dd966a3142dc1a9a8b',
              blockNumber: 487,
              blockHash:
                '0x9c31e26ff79032cab77c70a08919d1c0d538542952fa973014d8819043bffb71',
              transactionHash:
                '0x17a0cb05da7680b9afd6a4bccf4dedd26794764a6d6d23f0fb86752ca0aeb2a6',
              cOwner: '0x5BF631060b226407A1353bcEef88e3f98aB722A8',
              requestHash:
                '0xa47cdbafddcbde5c9f532b3ac52e6e89ba9d98d51517b6875165b76d0e38796f',
              worker: '0xdB0B665D36E3b68D77B72D0eC3B8349863C48218',
              outputHash:
                '0x36264a49e796c8fdb4caa3ab81aff4ea41c61e1cb47b05fef06bc9c96071bf01',
              rootHash:
                '0xee9a2be93b0ff8d6a95159d40ab55ab5e3f1d44424296315723f3c7b87986aae',
              attester:
                '0xa44986e16bbe80214b088e5833d42c84ba08f8baa5060e1067a9f5f87a60f25a',
              isPassed: true,
              calcResult: [1],
              __v: 0,
            },
            {
              _id: '625a93dd966a3142dc1a9a8f',
              blockNumber: 488,
              blockHash:
                '0x8f4fe975ab76584deaf151448ec749ec4124e8c94405b717f6633527f4b04889',
              transactionHash:
                '0x145df32ca30961bd7585fd8d1ae4a4970fedc836ea79648644038b150e2e749b',
              cOwner: '0x5BF631060b226407A1353bcEef88e3f98aB722A8',
              requestHash:
                '0xa47cdbafddcbde5c9f532b3ac52e6e89ba9d98d51517b6875165b76d0e38796f',
              worker: '0x2560b53FFa83BDfd65a64Eda9214BF50559C70F0',
              outputHash:
                '0x36264a49e796c8fdb4caa3ab81aff4ea41c61e1cb47b05fef06bc9c96071bf01',
              rootHash:
                '0xee9a2be93b0ff8d6a95159d40ab55ab5e3f1d44424296315723f3c7b87986aae',
              attester:
                '0xa44986e16bbe80214b088e5833d42c84ba08f8baa5060e1067a9f5f87a60f25a',
              isPassed: true,
              calcResult: [1],
              __v: 0,
            },
          ],
          finished: true,
          verified: true,
        },
      },
    })
    .build()
  @Get('/result')
  async getAttestResult(@Query('rootHash') rootHash: string) {
    const result = await this.proofService.getAttestResult(rootHash);
    return ResultResponse.success(result);
  }
}

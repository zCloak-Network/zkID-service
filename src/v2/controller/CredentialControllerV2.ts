import { Controller, Get, Inject, Param, Provide, Query } from '@midwayjs/decorator';
import { CreateApiDoc } from '@midwayjs/swagger';
import { ResultVO } from '../../util/ResultVO';
import { ProofServiceV2 } from '../service/ProofServiceV2';

@Provide()
@Controller('/v2/credential', {
  tagName: 'credential interface',
  description: 'v2',
})
export class CredentialControllerV2 {
  @Inject()
  proofServiceV2: ProofServiceV2;

  @CreateApiDoc()
    .summary(`get user address by credential's rootHash`)
    .param('root hash')
    .param('chain id')
    .respond(200, 'user address', 'json', {
      example: {
        code: 200,
        data: {
          dataOwner: '0x3F367B10c15B2aB6EEef0f0e73Eca258e6031077',
        },
      },
    })
    .build()
  @Get('/:rootHash/user')
  async isVerifiedByRootHash(
    @Param() rootHash: string,
    @Query('chainId') chainId: number,
  ) {
    const address = await this.proofServiceV2.getUserAddressByRootHash(rootHash, chainId);
    return ResultVO.success({address})
  }
}

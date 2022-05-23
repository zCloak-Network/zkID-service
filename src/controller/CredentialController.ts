import { Controller, Get, Inject, Param, Provide } from '@midwayjs/decorator';
import { CreateApiDoc } from '@midwayjs/swagger';
import { ProofService } from '../service/ProofService';
import { ResultVO } from '../util/ResultVO';

@Provide()
@Controller('/credential', {
  tagName: 'credential interface',
  description: 'v1',
})
export class CredentialController {
  @Inject()
  proofService: ProofService;

  @CreateApiDoc()
    .summary(`get user address by credential's rootHash`)
    .param('root hash')
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
  async isVerifiedByRootHash(@Param() rootHash: string) {
    const address = await this.proofService.getUserAddressByRootHash(rootHash);
    return ResultVO.success({address})
  }
}

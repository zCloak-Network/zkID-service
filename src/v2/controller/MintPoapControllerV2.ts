import { Controller, Get, Inject, Provide, Query } from '@midwayjs/decorator';
import { CreateApiDoc } from '@midwayjs/swagger';
import { ResultVO } from '../../util/ResultVO';
import { PoapServiceV2 } from '../service/PoapServiceV2';

@Provide()
@Controller('/v2/mint-poap', {
  tagName: 'mint poap operate interface',
  description: 'v2',
})
export class MintPoapControllerV2 {
  @Inject()
  poapService: PoapServiceV2;

  @CreateApiDoc()
    .summary('query mint poap result')
    .param('who')
    .param('chain id')
    .respond(200, 'mint poap list', 'json', {
      example: {
        code: 200,
        data: {
          poapId: '1',
          who: '1',
          nftId: '1',
        },
      },
    })
    .build()
  @Get('/')
  async getByWho(
    @Query('who') who: string,
    @Query('chainId') chainId: number,
  ) {
    const data = await this.poapService.getByWho(who, chainId);
    return ResultVO.success(data);
  }
}

import { Controller, Get, Inject, Provide, Query } from '@midwayjs/decorator';
import { MintPoapService } from '../service/MintPoapService';
import { CreateApiDoc } from '@midwayjs/swagger';
import { ResultVO } from '../util/ResultVO';

@Provide()
@Controller('/mint-poap', {
  tagName: 'mint poap operate interface',
  description: 'v1',
})
export class MintPoapController {
  @Inject()
  mintPoapService: MintPoapService;

  @CreateApiDoc()
    .summary('query mint poap result')
    .description('query mint poap by who')
    .param('who')
    .respond(200, 'mint poap list', 'json', {
      example: {
        "code": 200,
        "data": {
          poapId: '1',
          who: '1',
          nftId: '1',
        }
      }
    })
    .build()
  @Get('/')
  async getByWho(@Query('who') who: string) {
    const data = await this.mintPoapService.getByWho(who);
    return ResultVO.success(data);
  }
}

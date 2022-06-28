import { Controller, Get, Inject, Provide, Query } from '@midwayjs/decorator';
import { CreateApiDoc } from '@midwayjs/swagger';
import { ProofService } from '../service/ProofService';
import { ResultResponse } from '../util/ResultResponse';
import { UserService } from '../service/UserService';

@Provide()
@Controller('/user', {
  tagName: 'user related interface',
  description: 'v1',
})
export class UserController {
  @Inject()
  proofService: ProofService;

  @Inject()
  userService: UserService;

  @Get('/activies')
  async listUserActivities(@Query('dataOwner') dataOwner: string) {
    const data = await this.userService.listUserActivities(dataOwner);
    return ResultResponse.success(data);
  }

  @CreateApiDoc()
    .summary('query user proof attest process')
    .description('query user proof attest process by dataOwner and programHash')
    .param('user address')
    .param('program hash')
    .respond(200, 'user proof result', 'json', {
      example: {
        code: 200,
        data: [
          {
            cTypeHash:
              '0xe21c5f437332f33db0e6f9cef958f2ff3fedfbcdeb60d4ff24db978b487aad1a',
            rootHash:
              '0x8e8132474aa2cc723288da508156a717618bae23f6eed10aaeb5d2f46ca2331f',
            proofCid: 'QmVAau8b1tvHwNMPCVwsPu26vkN2iazBwvFaJW4AS39VRr',
            expectResult: [3],
            fieldNames:
              '6383461,427020088179,8271117968073418672650679055481,30765223346328968342731846777,9459527121954502519414720132217',
            time: null,
            percent: '0.67',
            status: 'Verified True',
            programDetails: {
              programHash:
                '0x0e8fbf57ffa900978d17b3c0a9025cc955a648baa8e760d3f38e22503473641d',
              programFieldName:
                'age, class, helmet_rarity, chest_rarity, weapon_rarity',
              programName: 'zkPortrait Issuance Rule',
            },
            claimAlias: 'credential_test0412',
          },
        ],
      },
    })
    .build()
  @Get('/proof')
  async listUserProofProcess(
    @Query('dataOwner') dataOwner: string,
    @Query('programHash') programHash: string
  ) {
    const data = await this.proofService.listUserProofProcess(
      dataOwner,
      programHash
    );
    return ResultResponse.success(data);
  }
}

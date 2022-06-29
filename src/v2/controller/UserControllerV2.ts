import { Controller, Get, Inject, Provide, Query } from '@midwayjs/decorator';
import { CreateApiDoc } from '@midwayjs/swagger';
import { ResultResponse } from '../../util/ResultResponse';
import { ProofServiceV2 } from '../service/ProofServiceV2';
import { UserServiceV2 } from '../service/UserServiceV2';

@Provide()
@Controller('/v2/user', {
  tagName: 'user related interface',
  description: 'v2',
})
export class UserControllerV2 {
  @Inject()
  proofService: ProofServiceV2;

  @Inject()
  userService: UserServiceV2;

  @CreateApiDoc()
    .summary('query user activity')
    .param('user address')
    .param('chain id')
    .respond(200, 'user proof result', 'json', {
      example: {
        code: 200,
        data: [
          {
            operateType: 'Claim',
            transactionHash: 'sdfasdfasd',
            time: '2021-12-02 17:34:53',
          },
        ],
      },
    })
    .build()
  @Get('/activies')
  async listUserActivities(
    @Query('dataOwner') dataOwner: string,
    @Query('chainId') chainId: number,
  ) {
    const data = await this.userService.listUserActivities(dataOwner, chainId);
    return ResultResponse.success(data);
  }

  @CreateApiDoc()
    .summary('query user proof attest process')
    .param('user address')
    .param('program hash')
    .param('chain id')
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
    @Query('requestHash') requestHash: string,
    @Query('chainId') chainId: number,
  ) {
    const data = await this.proofService.listUserProofProcess(
      dataOwner,
      requestHash,
      chainId,
    );
    return ResultResponse.success(data);
  }
}

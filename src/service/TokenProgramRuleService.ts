import { Provide } from '@midwayjs/decorator';
import { ReturnModelType } from '@typegoose/typegoose';
import { TokenProgramRule } from '../entity/TokenProgramRule';
import { InjectEntityModel } from '@midwayjs/typegoose';

@Provide()
export class TokenProgramRuleService {
  @InjectEntityModel(TokenProgramRule)
  tokenProgramRuleService: ReturnModelType<typeof TokenProgramRule>;

  async save(tokenProgramRule: TokenProgramRule) {
    await this.tokenProgramRuleService.create(tokenProgramRule);
  }
}

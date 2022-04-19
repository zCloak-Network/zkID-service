import { prop } from '@typegoose/typegoose';

// @EntityModel()
// @modelOptions({ schemaOptions: { collection: 'token_program_rules' } })
export class TokenProgramRule {
  @prop({ required: true })
  tokenAddress: string;

  @prop({ required: true })
  checker: string;

  @prop({ required: true })
  expectedResult: boolean;

  @prop({ required: true })
  cTypeHash: string;

  @prop({ required: true })
  programHash: string;
}

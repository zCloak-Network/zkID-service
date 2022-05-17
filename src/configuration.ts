import { ILifeCycle, IMidwayContainer } from '@midwayjs/core';
import { App, Configuration } from '@midwayjs/decorator';
import * as swagger from '@midwayjs/swagger';
import * as typegoose from '@midwayjs/typegoose';
import { Application } from 'egg';
import { join } from 'path';

@Configuration({
  imports: [typegoose, swagger],
  importConfigs: [join(__dirname, './config')],
  conflictCheck: true,
})
export class ContainerLifeCycle implements ILifeCycle {
  @App()
  app: Application;

  async onReady(container: IMidwayContainer) {
    console.log(`Current ENVIRONMENT: ${this.app.getEnv()}`);
  }
}

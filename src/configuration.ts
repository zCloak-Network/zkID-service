import { App, Config, Configuration } from '@midwayjs/decorator';
import { ILifeCycle, IMidwayContainer } from '@midwayjs/core';
import { Application } from 'egg';
import { join } from 'path';
import * as typegoose from '@midwayjs/typegoose';
import * as task from '@midwayjs/task';
import Web3 from 'web3';

@Configuration({
  imports: [typegoose, task],
  importConfigs: [join(__dirname, './config')],
  conflictCheck: true,
})
export class ContainerLifeCycle implements ILifeCycle {
  @App()
  app: Application;

  @Config('zCloak.scanBlock.moonbeamAddress')
  moonbeamAddress: string;

  async onReady(container: IMidwayContainer) {
    // inject ethereum api
    const web3 = new Web3(Web3.givenProvider || this.moonbeamAddress);
    container.registerObject('web3', web3);
  }
}

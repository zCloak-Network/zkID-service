import { getClassMetadata, ILifeCycle, IMidwayContainer } from '@midwayjs/core';
import { App, Config, Configuration, listModule } from '@midwayjs/decorator';
import * as orm from '@midwayjs/orm';
import * as swagger from '@midwayjs/swagger';
import * as typegoose from '@midwayjs/typegoose';
import { Application } from 'egg';
import { join } from 'path';
import { ArrUtils } from './util/ArrUtils';
import { CONTRACT_DECORATOR_KEY } from './v2/contract/Contract';

@Configuration({
  imports: [
    typegoose,
    swagger,
    orm,
  ],
  importConfigs: [join(__dirname, './config')],
  conflictCheck: true,
})
export class ContainerLifeCycle implements ILifeCycle {
  @App()
  app: Application;

  @Config('zCloak.scan.contractConfigs')
  contractConfigs: any[];

  async onReady(container: IMidwayContainer) {
    // relate entity and contract name
    const modules = listModule(CONTRACT_DECORATOR_KEY);
    const entityContractNameMap = new Map();
    for (let mod of modules) {
      // const metadata = getClassMetadata('decorator:contract', mod);
      const metadata = getClassMetadata(CONTRACT_DECORATOR_KEY, mod);
      entityContractNameMap.set(mod, metadata.contractName);
    }

    this.app.getApplicationContext().registerObject('entityContractNameMap', entityContractNameMap);

    // relate chainId and contract config
    const chainIdContractConfigMap = new Map();
    if (ArrUtils.isNotEmpty(this.contractConfigs)) {
      for (let contractConfig of this.contractConfigs) {
        chainIdContractConfigMap.set(contractConfig.chainId.toString(), contractConfig.contract);
      }
    }

    this.app.getApplicationContext().registerObject('chainIdContractConfigMap', chainIdContractConfigMap);

    console.log(`Current ENVIRONMENT: ${this.app.getEnv()}`);
  }
}

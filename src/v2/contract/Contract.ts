import { saveClassMetadata, saveModule } from '@midwayjs/decorator';

const CONTRACT_DECORATOR_KEY = 'decorator:contract';

function Contract(contractOption: ContractOption): ClassDecorator {
  return (target: any) => {
    saveModule(CONTRACT_DECORATOR_KEY, target);
    saveClassMetadata(
      CONTRACT_DECORATOR_KEY,
      {
        contractName: contractOption.name,
      },
      target
    );
  };
}

type ContractType = 'ProofStorage' | 'SimpleAggregator' | 'ZcloakPoap';

class ContractOption {
  name: ContractType;
}

export { CONTRACT_DECORATOR_KEY, Contract };

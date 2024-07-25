import { Gateway, Wallets } from 'fabric-network';
import { SecretsManager } from 'aws-sdk';

const certContent = SecretsManager.getSecretValue({
  SecretId: certContent,
});

const privateKey = SecretsManager.getSecretValue({ SecretId: 'PRIVATE_KEY' });

const ccp = {
  name: 'Network',
  version: '1.1',
  channels: {
    'ws-supplier-channel': {
      orderers: [
        'orderer.n-e6kqya3ve5hmdf2bnv4bfcnkga.managedblockchain.eu-west-1.amazonaws.com:30001',
      ],
      peers: [
        'nd-n3kcx2gymnaxxjtey3agpaprw4.m-rf4xjnqfsrhzjcryku3tl3dbe4.n-e6kqya3ve5hmdf2bnv4bfcnkga.managedblockchain.eu-west-1.amazonaws.com',
      ],
    },
  },
  organizations: {
    Org1: {
      mspid: 'm-RF4XJNQFSRHZJCRYKU3TL3DBE4',
      peers: [
        'nd-n3kcx2gymnaxxjtey3agpaprw4.m-rf4xjnqfsrhzjcryku3tl3dbe4.n-e6kqya3ve5hmdf2bnv4bfcnkga.managedblockchain.eu-west-1.amazonaws.com',
      ],
    },
  },
  orderers: {
    'orderer.n-e6kqya3ve5hmdf2bnv4bfcnkga.managedblockchain.eu-west-1.amazonaws.com':
      {
        url: 'grpcs://orderer.n-e6kqya3ve5hmdf2bnv4bfcnkga.managedblockchain.eu-west-1.amazonaws.com:30001',
        grpcOptions: {
          'ssl-target-name-override':
            'orderer.n-e6kqya3ve5hmdf2bnv4bfcnkga.managedblockchain.eu-west-1.amazonaws.com',
        },
        tlsCACerts: {
          path: '/admin-msp/cacerts/ca-m-rf4xjnqfsrhzjcryku3tl3dbe4-n-e6kqya3ve5hmdf2bnv4bfcnkga-managedblockchain-eu-west-1-amazonaws-com-30002.pem',
        },
      },
  },
  peers: {
    'nd-n3kcx2gymnaxxjtey3agpaprw4.m-rf4xjnqfsrhzjcryku3tl3dbe4.n-e6kqya3ve5hmdf2bnv4bfcnkga.managedblockchain.eu-west-1.amazonaws.com':
      {
        url: 'grpcs://nd-n3kcx2gymnaxxjtey3agpaprw4.m-rf4xjnqfsrhzjcryku3tl3dbe4.n-e6kqya3ve5hmdf2bnv4bfcnkga.managedblockchain.eu-west-1.amazonaws.com:30003',
        grpcOptions: {
          'ssl-target-name-override':
            'nd-n3kcx2gymnaxxjtey3agpaprw4.m-rf4xjnqfsrhzjcryku3tl3dbe4.n-e6kqya3ve5hmdf2bnv4bfcnkga.managedblockchain.eu-west-1.amazonaws.com',
        },
        tlsCACerts: {
          path: '/admin-msp/cacerts/ca-m-rf4xjnqfsrhzjcryku3tl3dbe4-n-e6kqya3ve5hmdf2bnv4bfcnkga-managedblockchain-eu-west-1-amazonaws-com-30002.pem',
        },
      },
  },
};

// TODO: @Rotenda
export const createAsset = async (asset) => {
  const gateway = new Gateway();
  const wallet = await Wallets.newInMemoryWallet();
  await gateway.connect(ccp, {
    wallet: wallet,
    identity: ccp.organizations.Org1.mspid,
    discovery: { enabled: true, asLocalhost: true },
  });

  const network = await gateway.getNetwork('ws-supplier-channel');
  const contract = network.getContract('ws-supplier-cc');

  await contract.submitTransaction('CreateAsset', JSON.stringify(asset));
  await gateway.disconnect();
};

// ? @Lucinda Done
export const updateAsset = async (asset) => {
  const gateway = new Gateway();
  const wallet = await Wallets.newInMemoryWallet();
  const identity = {
    credentials: {
      certificate: certContent,
      privateKey: privateKey,
    },
    mspId: cpp.organizations.Org1.mspid,
    type: 'X.509',
  };

  await wallet.put('appUser', identity);

  await gateway.connect(ccp, {
    wallet: wallet,
    identity: 'appUser',
    discovery: { enabled: true, asLocalhost: true },
  });

  const network = await gateway.getNetwork('ws-supplier-channel');
  const contract = network.getContract('ws-supplier-cc');

  const oldAssetBytes = await contract.evaluateTransaction(
    'GetAssetById',
    asset.itemID
  );
  const oldAsset = JSON.parse(oldAssetBytes.toString());

  if (oldAsset) {
    const newAsset = {
      ...oldAsset,
      ...asset,
      origin: JSON.stringify(asset.origin),
      processing: JSON.stringify(asset.processing),
      packaging: JSON.stringify(asset.packaging),
      shipment: JSON.stringify(asset.shipment),
      currentOwner: JSON.stringify(asset.currentOwner),
      transactionHistory: JSON.stringify(asset.transactionHistory),
    };

    await contract.submitTransaction(
      'UpdateAsset',
      newAsset.itemID,
      newAsset.itemName,
      JSON.stringify(newAsset.origin),
      JSON.stringify(newAsset.processing),
      JSON.stringify(newAsset.packaging),
      JSON.stringify(newAsset.shipment),
      JSON.stringify(newAsset.currentOwner),
      JSON.stringify(newAsset.transactionHistory)
    );
  }

  await gateway.disconnect();
};

// TODO: @Rotenda
export const deleteAsset = async (id) => {
  const gateway = new Gateway();
  const wallet = await Wallets.newInMemoryWallet();
  const identity = {
    credentials: {
      certificate: certContent,
      privateKey: privateKey,
    },
    mspId: cpp.organizations.Org1.mspid,
    type: 'X.509',
  };

  await wallet.put('appUser', identity);

  await gateway.connect(ccp, {
    wallet: wallet,
    identity: 'appUser',
    discovery: { enabled: true, asLocalhost: true },
  });

  const network = await gateway.getNetwork('ws-supplier-channel');
  const contract = network.getContract('ws-supplier-cc');

  await contract.submitTransaction('DeleteAsset', id);
  await gateway.disconnect();
};

// TODO: @Rotenda
export const getAllAssets = async () => {
  const gateway = new Gateway();
  const wallet = await Wallets.newInMemoryWallet();
  const identity = {
    credentials: {
      certificate: certContent,
      privateKey: privateKey,
    },
    mspId: cpp.organizations.Org1.mspid,
    type: 'X.509',
  };

  await wallet.put('appUser', identity);

  await gateway.connect(ccp, {
    wallet: wallet,
    identity: 'appUser',
    discovery: { enabled: true, asLocalhost: true },
  });

  const network = await gateway.getNetwork('ws-supplier-channel');
  const contract = network.getContract('ws-supplier-cc');

  const result = await contract.evaluateTransaction('GetAllAssets');
  await gateway.disconnect();
  return JSON.parse(result.toString());
};

//! TODO: @Lucinda
export const transferAsset = async (asset) => {
  const gateway = new Gateway();
  const wallet = await Wallets.newInMemoryWallet();
  const identity = {
    credentials: {
      certificate: certContent,
      privateKey: privateKey,
    },
    mspId: cpp.organizations.Org1.mspid,
    type: 'X.509',
  };

  await wallet.put('appUser', identity);

  await gateway.connect(ccp, {
    wallet: wallet,
    identity: 'appUser',
    discovery: { enabled: true, asLocalhost: true },
  });

  const network = await gateway.getNetwork('ws-supplier-channel');
  const contract = network.getContract('ws-supplier-cc');

  await contract.submitTransaction('TransferAsset', JSON.stringify(asset));
  await gateway.disconnect();
};

//! TODO: @Lucinda
export const getAssetsByOwner = async (asset) => {
  const gateway = new Gateway();
  const wallet = await Wallets.newInMemoryWallet();
  const identity = {
    credentials: {
      certificate: certContent,
      privateKey: privateKey,
    },
    mspId: cpp.organizations.Org1.mspid,
    type: 'X.509',
  };

  await wallet.put('appUser', identity);

  await gateway.connect(ccp, {
    wallet: wallet,
    identity: 'appUser',
    discovery: { enabled: true, asLocalhost: true },
  });

  const network = await gateway.getNetwork('ws-supplier-channel');
  const contract = network.getContract('ws-supplier-cc');

  await contract.submitTransaction('ChangeAssetOwner', JSON.stringify(asset));
  await gateway.disconnect();
};

// TODO: @Rotenda
export const getAssetHistory = async (id) => {
  const gateway = new Gateway();
  const wallet = await Wallets.newInMemoryWallet();
  const identity = {
    credentials: {
      certificate: certContent,
      privateKey: privateKey,
    },
    mspId: cpp.organizations.Org1.mspid,
    type: 'X.509',
  };

  await wallet.put('appUser', identity);

  await gateway.connect(ccp, {
    wallet: wallet,
    identity: 'appUser',
    discovery: { enabled: true, asLocalhost: true },
  });

  const network = await gateway.getNetwork('ws-supplier-channel');
  const contract = network.getContract('ws-supplier-cc');

  const result = await contract.evaluateTransaction('GetAssetHistory', id);
  await gateway.disconnect();
  return JSON.parse(result.toString());
};

// TODO: @Rotenda
export const getAssetById = async (Id) => {
  const gateway = new Gateway();
  const wallet = await Wallets.newInMemoryWallet();
  const identity = {
    credentials: {
      certificate: certContent,
      privateKey: privateKey,
    },
    mspId: cpp.organizations.Org1.mspid,
    type: 'X.509',
  };

  await wallet.put('appUser', identity);

  await gateway.connect(ccp, {
    wallet: wallet,
    identity: 'appUser',
    discovery: { enabled: true, asLocalhost: true },
  });

  const network = await gateway.getNetwork('ws-supplier-channel');
  const contract = network.getContract('ws-supplier-cc');

  const result = await contract.evaluateTransaction('GetAssetById', Id);
  await gateway.disconnect();
  return JSON.parse(result.toString());
};

// TODO: @Rotenda
export const assetExists = async (id) => {
  const gateway = new Gateway();
  const wallet = await Wallets.newInMemoryWallet();
  const identity = {
    credentials: {
      certificate: certContent,
      privateKey: privateKey,
    },
    mspId: 'm-RF4XJNQFSRHZJCRYKU3TL3DBE4',
    type: 'X.509',
  };

  await wallet.put('appUser', identity);

  await gateway.connect(ccp, {
    wallet: wallet,
    identity: 'appUser',
    discovery: { enabled: true, asLocalhost: true },
  });

  const network = await gateway.getNetwork('ws-supplier-channel');
  const contract = network.getContract('ws-supplier-cc');
  const result = await contract.evaluateTransaction('AssetExists', id);
  await gateway.disconnect();
  return JSON.parse(result.toString());
};

// ? @Lucinda Done
export const readAsset = async (id) => {
  const gateway = new Gateway();
  const wallet = await Wallets.newInMemoryWallet();
  const identity = {
    credentials: {
      certificate: certContent,
      privateKey: privateKey,
    },
    mspId: cpp.organizations.Org1.mspid,
    type: 'X.509',
  };

  await wallet.put('appUser', identity);

  await gateway.connect(ccp, {
    wallet: wallet,
    identity: 'appUser',
    discovery: { enabled: true, asLocalhost: true },
  });

  const network = await gateway.getNetwork('ws-supplier-channel');
  const contract = network.getContract('ws-supplier-cc');
  const result = await contract.evaluateTransaction('ReadAsset', id);
  await gateway.disconnect();
  return JSON.parse(result.toString());
};

// ? @Lucinda Done
export const GetQueryResultForQueryString = async (id) => {
  const gateway = new Gateway();
  const wallet = await Wallets.newInMemoryWallet();
  const identity = {
    credentials: {
      certificate: certContent,
      privateKey: privateKey,
    },
    mspId: cpp.organizations.Org1.mspid,
    type: 'X.509',
  };

  await wallet.put('appUser', identity);

  await gateway.connect(ccp, {
    wallet: wallet,
    identity: 'appUser',
    discovery: { enabled: true, asLocalhost: true },
  });

  const network = await gateway.getNetwork('ws-supplier-channel');
  const contract = network.getContract('ws-supplier-cc');
  const result = await contract.evaluateTransaction(
    'GetQueryResultForQueryString',
    id
  );
  await gateway.disconnect();
  return JSON.parse(result.toString());
};

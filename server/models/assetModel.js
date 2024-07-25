import { Gateway, Wallets } from 'fabric-network';

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

export const createAsset = async (asset) => {
  const gateway = new Gateway();
  const wallet = await Wallets.newInMemoryWallet();
  await gateway.connect(ccp, {
    wallet: wallet,
    identity: ccp.organizations.Org1.mspid,
    discovery: { enabled: true, asLocalhost: true },
  });

  const network = await gateway.getNetwork('ws-supplier-channel');
  const contract = network.getContract();

  await contract.submitTransaction('CreateAsset', JSON.stringify(asset));
  await gateway.disconnect();
};

export const updateAsset = async (asset) => {
  const gateway = new Gateway();
  const wallet = await Wallets.newInMemoryWallet();
  await gateway.connect(ccp, {
    wallet: wallet,
    identity: ccp.organizations.Org1.mspid,
    discovery: { enabled: true, asLocalhost: true },
  });

  const network = await gateway.getNetwork('ws-supplier-channel');
  const contract = network.getContract('asset');

  const oldAsset = await contract.evaluateTransaction('GetAssetById', asset.Id);
  if (oldAsset) {
    const newAsset = JSON.parse(oldAsset.toString());
    newAsset = { ...newAsset, ...asset };
    await contract.submitTransaction('UpdateAsset', JSON.stringify(newAsset));
  }

  await gateway.disconnect();
};

export const deleteAsset = async (id) => {
  const gateway = new Gateway();
  const wallet = await Wallets.newInMemoryWallet();
  await gateway.connect(ccp, {
    wallet: wallet,
    identity: ccp.organizations.Org1.mspid,
    discovery: { enabled: true, asLocalhost: true },
  });

  const network = await gateway.getNetwork('ws-supplier-channel');
  const contract = network.getContract('asset');

  await contract.submitTransaction('DeleteAsset', id);
  await gateway.disconnect();
};

export const getAllAssets = async () => {
  const gateway = new Gateway();
  const wallet = await Wallets.newInMemoryWallet();
  await gateway.connect(ccp, {
    wallet: wallet,
    identity: ccp.organizations.Org1.mspid,
    discovery: { enabled: true, asLocalhost: true },
  });

  const network = await gateway.getNetwork('ws-supplier-channel');
  const contract = network.getContract('asset');

  const result = await contract.evaluateTransaction('GetAllAssets');
  await gateway.disconnect();
  return JSON.parse(result.toString());
};

export const transferAsset = async (asset) => {
  const gateway = new Gateway();
  const wallet = await Wallets.newInMemoryWallet();
  await gateway.connect(ccp, {
    wallet: wallet,
    identity: ccp.organizations.Org1.mspid,
    discovery: { enabled: true, asLocalhost: true },
  });

  const network = await gateway.getNetwork('ws-supplier-channel');
  const contract = network.getContract('asset');

  await contract.submitTransaction('TransferAsset', JSON.stringify(asset));
  await gateway.disconnect();
};

export const getAssetsByOwner = async (asset) => {
  const gateway = new Gateway();
  const wallet = await Wallets.newInMemoryWallet();
  await gateway.connect(ccp, {
    wallet: wallet,
    identity: ccp.organizations.Org1.mspid,
    discovery: { enabled: true, asLocalhost: true },
  });

  const network = await gateway.getNetwork('ws-supplier-channel');
  const contract = network.getContract('asset');

  await contract.submitTransaction('ChangeAssetOwner', JSON.stringify(asset));
  await gateway.disconnect();
};

export const getAssetHistory = async (id) => {
  const gateway = new Gateway();
  const wallet = await Wallets.newInMemoryWallet();
  await gateway.connect(ccp, {
    wallet: wallet,
    identity: ccp.organizations.Org1.mspid,
    discovery: { enabled: true, asLocalhost: true },
  });

  const network = await gateway.getNetwork('ws-supplier-channel');
  const contract = network.getContract('asset');

  const result = await contract.evaluateTransaction('GetAssetHistory', id);
  await gateway.disconnect();
  return JSON.parse(result.toString());
};

export const getAssetById = async (Id) => {
  const gateway = new Gateway();
  const wallet = await Wallets.newInMemoryWallet();
  await gateway.connect(ccp, {
    wallet: wallet,
    identity: ccp.organizations.Org1.mspid,
    discovery: { enabled: true, asLocalhost: true },
  });

  const network = await gateway.getNetwork('ws-supplier-channel');
  const contract = network.getContract('asset');

  const result = await contract.evaluateTransaction('GetAssetById', Id);
  await gateway.disconnect();
  return JSON.parse(result.toString());
};

export const assetExists = async (id) => {
  const gateway = new Gateway();
  const wallet = await Wallets.newInMemoryWallet();
  await gateway.connect(ccp, {
    wallet: wallet,
    identity: ccp.organizations.Org1.mspid,
    discovery: { enabled: true, asLocalhost: true },
  });

  const network = await gateway.getNetwork('ws-supplier-channel');
  const contract = network.getContract('asset');
  const result = await contract.evaluateTransaction('AssetExists', id);
  await gateway.disconnect();
  return JSON.parse(result.toString());
};

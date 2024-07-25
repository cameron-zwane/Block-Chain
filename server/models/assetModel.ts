import { Gateway, Wallets } from 'fabric-network';

const ccp = {
  name: 'Network',
  version: '1.1',
  channels: {
    mychannel: {
      orderers: ['orderer.example.com'],
      peers: ['peer0.org1.example.com', 'peer0.org2.example.com'],
    },
  },
  organizations: {
    Org1: {
      mspid: 'Org1MSP',
      peers: ['peer0.org1.example.com'],
    },
    Org2: {
      mspid: 'Org2MSP',
      peers: ['peer0.org2.example.com'],
    },
  },
  orderers: {
    'orderer.example.com': {
      url: 'grpcs://localhost:7050',
      grpcOptions: {
        'ssl-target-name-override': 'orderer.example.com',
      },
      tlsCACerts: {
        path: 'test/ordererOrganizations/example.com/orderers/orderer.example.com/tlscacerts/example.com-cert.pem',
      },
    },
  },
  peers: {
    'peer0.org1.example.com': {
      url: 'grpcs://localhost:7051',
      grpcOptions: {
        'ssl-target-name-override': 'peer0.org1.example.com',
      },
      tlsCACerts: {
        path: 'test/peerOrganizations/org1.example.com/peers/peer0.org1.example.com/tlscacerts/org1.example.com-cert.pem',
      },
    },
    'peer0.org2.example.com': {
      url: 'grpcs://localhost:8051',
      grpcOptions: {
        'ssl-target-name-override': 'peer0.org2.example.com',
      },
      tlsCACerts: {
        path: 'test/peerOrganizations/org2.example.com/peers/peer0.org2.example.com/tlscacerts/org2.example.com-cert.pem',
      },
    },
  },
};

export const createAsset = async (asset) => {
  const gateway = new Gateway();
  const wallet = await Wallets.newInMemoryWallet();
  await gateway.connect(ccp, {
    wallet: wallet,
    identity: 'admin',
    discovery: { enabled: true, asLocalhost: true },
  });

  const network = await gateway.getNetwork('Network');
  const contract = network.getContract('asset');

  await contract.submitTransaction('CreateAsset', JSON.stringify(asset));
  await gateway.disconnect();
};

export const updateAsset = async (asset) => {
  const gateway = new Gateway();
  const wallet = await Wallets.newInMemoryWallet();
  await gateway.connect(ccp, {
    wallet: wallet,
    identity: 'admin',
    discovery: { enabled: true, asLocalhost: true },
  });

  const network = await gateway.getNetwork('Network');
  const contract = network.getContract('asset');

  await contract.submitTransaction('UpdateAsset', JSON.stringify(asset));
  await gateway.disconnect();
};

export const deleteAsset = async (id) => {
  const gateway = new Gateway();
  const wallet = await Wallets.newInMemoryWallet();
  await gateway.connect(ccp, {
    wallet: wallet,
    identity: 'admin',
    discovery: { enabled: true, asLocalhost: true },
  });

  const network = await gateway.getNetwork('Network');
  const contract = network.getContract('asset');

  await contract.submitTransaction('DeleteAsset', id);
  await gateway.disconnect();
};

export const getAllAssets = async () => {
  const gateway = new Gateway();
  const wallet = await Wallets.newInMemoryWallet();
  await gateway.connect(ccp, {
    wallet: wallet,
    identity: 'admin',
    discovery: { enabled: true, asLocalhost: true },
  });

  const network = await gateway.getNetwork('Network');
  const contract = network.getContract('asset');

  const result = await contract.evaluateTransaction('QueryAllAssets');
  await gateway.disconnect();
  return JSON.parse(result.toString());
};

export const transferAsset = async (asset) => {
  const gateway = new Gateway();
  const wallet = await Wallets.newInMemoryWallet();
  await gateway.connect(ccp, {
    wallet: wallet,
    identity: 'admin',
    discovery: { enabled: true, asLocalhost: true },
  });

  const network = await gateway.getNetwork('Network');
  const contract = network.getContract('asset');

  await contract.submitTransaction('TransferAsset', JSON.stringify(asset));
  await gateway.disconnect();
};

export const getAssetsByOwner = async (asset) => {
  const gateway = new Gateway();
  const wallet = await Wallets.newInMemoryWallet();
  await gateway.connect(ccp, {
    wallet: wallet,
    identity: 'admin',
    discovery: { enabled: true, asLocalhost: true },
  });

  const network = await gateway.getNetwork('Network');
  const contract = network.getContract('asset');

  await contract.submitTransaction('ChangeAssetOwner', JSON.stringify(asset));
  await gateway.disconnect();
};

export const getAssetHistory = async (id) => {
  const gateway = new Gateway();
  const wallet = await Wallets.newInMemoryWallet();
  await gateway.connect(ccp, {
    wallet: wallet,
    identity: 'admin',
    discovery: { enabled: true, asLocalhost: true },
  });

  const network = await gateway.getNetwork('Network');
  const contract = network.getContract('asset');

  const result = await contract.evaluateTransaction('GetAssetHistory', id);
  await gateway.disconnect();
  return JSON.parse(result.toString());
};

export const getAssetById = async (startId, endId) => {
  const gateway = new Gateway();
  const wallet = await Wallets.newInMemoryWallet();
  await gateway.connect(ccp, {
    wallet: wallet,
    identity: 'admin',
    discovery: { enabled: true, asLocalhost: true },
  });

  const network = await gateway.getNetwork('Network');
  const contract = network.getContract('asset');

  const result = await contract.evaluateTransaction(
    'GetAssetByRange',
    startId,
    endId
  );
  await gateway.disconnect();
  return JSON.parse(result.toString());
};

export const assetExists = async (id) => {
  const gateway = new Gateway();
  const wallet = await Wallets.newInMemoryWallet();
  await gateway.connect(ccp, {
    wallet: wallet,
    identity: 'admin',
    discovery: { enabled: true, asLocalhost: true },
  });

  const network = await gateway.getNetwork('Network');
  const contract = network.getContract('asset');

  const result = await contract.evaluateTransaction('AssetExists', id);
  await gateway.disconnect();
  return JSON.parse(result.toString());
};

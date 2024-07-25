import { Gateway, Wallets } from 'fabric-network';

const ccp = {
  // name: 'mychannel',
  // version: '1.0',
  // client: {
  //   organization: 'Org1',
  //   connection: {
  //     timeout: {
  //       peer: {
  //         endorser: '300',
  //       },
  //       orderer: '300',
  //     },
  //   },
  // },
  // channels: {
  //   mychannel: {
  //     orderers: ['orderer.example.com'],
  //     peers: {
  //       'peer0.org1.example.com': {
  //         endorsingPeer: true,
  //         chaincodeQuery: true,
  //         ledgerQuery: true,
  //         eventSource: true,
  //       },
  //     },
  //   },
  // },
  // organizations: {
  //   Org1: {
  //     mspid: 'Org1MSP',
  //     peers: ['peer0.org1.example.com'],
  //     certificateAuthorities: ['ca.org1.example.com'],
  //   },
  // },
  // orderers: {
  //   'orderer.example.com': {
  //     url: 'grpcs://localhost:7050',
  //     grpcOptions: {
  //       'ssl-target-name-override': 'orderer.example.com',
  //       'grpc.keepalive_time_ms': 600000,
  //     },
  //     tlsCACerts: {
  //       'pem': '-----BEGIN CERTIFICATE-----\nMIICGDCCAb+gAwIBAgIRAJ7
  //       ... -----END CERTIFICATE-----\n',
  //     },
  //   },
  // },
};

export const createAsset = async (asset) => {
  const gateway = new Gateway();
  const wallet = await Wallets.newInMemoryWallet();
  await gateway.connect(ccp, {
    wallet: wallet,
    identity: 'admin',
    discovery: { enabled: true, asLocalhost: true },
  });

  const network = await gateway.getNetwork('mychannel');
  const contract = network.getContract('asset');

  await contract.submitTransaction('CreateAsset', JSON.stringify(asset));
  await gateway.disconnect();
};

const assets = [];

module.exports = {
  createAsset: (asset) => {
    assets.push(asset);
    return asset;
  },
  getAssetById: (id) => assets.find((asset) => asset.ItemID === id),
  updateAsset: (id, newDetails) => {
    const index = assets.findIndex((asset) => asset.ItemID === id);
    if (index !== -1) {
      assets[index] = { ...assets[index], ...newDetails };
      return assets[index];
    }
    return null;
  },
  deleteAsset: (id) => {
    const index = assets.findIndex((asset) => asset.ItemID === id);
    if (index !== -1) {
      assets.splice(index, 1);
      return true;
    }
    return false;
  },
  assetExists: (id) => assets.some((asset) => asset.ItemID === id),
  getAllAssets: () => assets,
  transferAsset: (id, newOwner) => {
    const asset = assets.find((asset) => asset.ItemID === id);
    if (asset) {
      asset.CurrentOwner = newOwner;
      return asset;
    }
    return null;
  },
  getAssetHistory: (id) => {
    const asset = assets.find((asset) => asset.ItemID === id);
    return asset ? asset.TransactionHistory : null;
  },
  getAssetsByOwner: (ownerId) =>
    assets.filter((asset) => asset.CurrentOwner.Entity === ownerId),
};

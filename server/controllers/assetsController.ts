import {
  createAsset,
  getAssetById,
  updateAsset,
  getAllAssets,
  deleteAsset,
  assetExists,
  transferAsset,
  getAssetHistory,
  getAssetsByOwner,
} from '../models/assetModel.ts';

export const createAssetController = (req, res) => {
  const asset = createAsset(req.body);
  res.status(201).json(asset);
};

export const getAssetByIdController = (req, res) => {
  const asset = getAssetById(req.params.AssetId);
  if (asset) {
    res.json(asset);
  } else {
    res.status(404).send('Asset not found');
  }
};

export const updateAssetController = (req, res) => {
  const updatedAsset = updateAsset(req.params.AssetId);
  if (updatedAsset) {
    res.json(updatedAsset);
  } else {
    res.status(404).send('Asset not found');
  }
};

export const deleteAssetController = (req, res) => {
  const success = deleteAsset(req.params.AssetId);
  res.json({ success });
};

export const assetExistsController = (req, res) => {
  const exists = assetExists(req.params.AssetId);
  res.json({ exists });
};

export const getAllAssetsController = (req, res) => {
  const assets = getAllAssets();
  res.json(assets);
};

export const transferAssetController = (req, res) => {
  const asset = transferAsset(req.params.assetId);
  if (asset) {
    res.json(asset);
  } else {
    res.status(404).send('Asset not found');
  }
};

export const getAssetHistoryController = (req, res) => {
  const history = getAssetHistory(req.params.assetId);
  if (history) {
    res.json(history);
  } else {
    res.status(404).send('Asset not found');
  }
};

export const getAssetsByOwnerController = (req, res) => {
  const assets = getAssetsByOwner(req.params.OwnerId);
  res.json(assets);
};

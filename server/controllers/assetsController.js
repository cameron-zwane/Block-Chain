const assetModel = require('../models/assetModel');

exports.createAsset = (req, res) => {
  const asset = assetModel.createAsset(req.body);
  res.status(201).json(asset);
};

exports.getAssetById = (req, res) => {
  const asset = assetModel.getAssetById(req.params.AssetId);
  if (asset) {
    res.json(asset);
  } else {
    res.status(404).send('Asset not found');
  }
};

exports.updateAsset = (req, res) => {
  const updatedAsset = assetModel.updateAsset(req.params.AssetId, req.body);
  if (updatedAsset) {
    res.json(updatedAsset);
  } else {
    res.status(404).send('Asset not found');
  }
};

exports.deleteAsset = (req, res) => {
  const success = assetModel.deleteAsset(req.params.AssetId);
  if (success) {
    res.status(204).send();
  } else {
    res.status(404).send('Asset not found');
  }
};

exports.assetExists = (req, res) => {
  const exists = assetModel.assetExists(req.params.AssetId);
  res.json({ exists });
};

exports.getAllAssets = (req, res) => {
  const assets = assetModel.getAllAssets();
  res.json(assets);
};

exports.transferAsset = (req, res) => {
  const asset = assetModel.transferAsset(req.params.assetId, req.body.NewOwner);
  if (asset) {
    res.json(asset);
  } else {
    res.status(404).send('Asset not found');
  }
};

exports.getAssetHistory = (req, res) => {
  const history = assetModel.getAssetHistory(req.params.assetId);
  if (history) {
    res.json(history);
  } else {
    res.status(404).send('Asset not found');
  }
};

exports.getAssetsByOwner = (req, res) => {
  const assets = assetModel.getAssetsByOwner(req.params.OwnerId);
  res.json(assets);
};

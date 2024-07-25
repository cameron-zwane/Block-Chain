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
} from '../models/assetModel.js';

export const createAssetController = (req, res) => {
  try {
    const asset = createAsset(req.body);
    res.status(201).json(asset);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getAssetByIdController = (req, res) => {
  try {
    const asset = getAssetById(req.params.assetId);
    if (asset) {
      res.json(asset);
    } else {
      res.status(404).send('Asset not found');
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateAssetController = (req, res) => {
  try {
    const updatedAsset = updateAsset(req.params.assetId, req.body);
    if (updatedAsset) {
      res.json(updatedAsset);
    } else {
      res.status(404).send('Asset not found');
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteAssetController = (req, res) => {
  try {
    const success = deleteAsset(req.params.assetId);
    if (success) {
      res.json({ success });
    } else {
      res.status(404).send('Asset not found');
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const assetExistsController = (req, res) => {
  try {
    const exists = assetExists(req.params.assetId);
    res.json({ exists });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getAllAssetsController = (req, res) => {
  try {
    const assets = getAllAssets();
    res.json(assets);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const transferAssetController = (req, res) => {
  try {
    const asset = transferAsset(req.params.assetId, req.body);
    if (asset) {
      res.json(asset);
    } else {
      res.status(404).send('Asset not found');
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getAssetHistoryController = (req, res) => {
  try {
    const history = getAssetHistory(req.params.assetId);
    if (history) {
      res.json(history);
    } else {
      res.status(404).send('Asset not found');
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getAssetsByOwnerController = (req, res) => {
  try {
    const assets = getAssetsByOwner(req.params.ownerId);
    res.json(assets);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

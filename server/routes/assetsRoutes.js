import express from 'express';
import {
  createAssetController,
  getAssetByIdController,
  updateAssetController,
  deleteAssetController,
  assetExistsController,
  transferAssetController,
  getAllAssetsController,
  getAssetHistoryController,
  getAssetsByOwnerController,
} from '../controllers/assetsController.js';

export const router = express.Router();

router.post('/assets', createAssetController);
router.get('/assets/:AssetId', getAssetByIdController);
router.put('/assets/:AssetId', updateAssetController);
router.delete('/assets/:AssetId', deleteAssetController);
router.get('/assets/:AssetId/exists', assetExistsController);
router.post('/assets/:assetId/transfer', transferAssetController);
router.get('/assets/all', getAllAssetsController);
router.get('/assets/:assetId/history', getAssetHistoryController);
router.get('/owners/:OwnerId/assets', getAssetsByOwnerController);

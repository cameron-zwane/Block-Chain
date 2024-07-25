const express = require('express');
const router = express.Router();
const assetsController = require('../controllers/assetsController');

router.post('/assets', assetsController.createAsset);
router.get('/assets/:AssetId', assetsController.getAssetById);
router.put('/assets/:AssetId', assetsController.updateAsset);
router.delete('/assets/:AssetId', assetsController.deleteAsset);
router.get('/assets/:AssetId/exists', assetsController.assetExists);
router.post('/assets/:assetId/transfer', assetsController.transferAsset);
router.get('/assets/all', assetsController.getAllAssets);
router.get('/assets/:assetId/history', assetsController.getAssetHistory);
router.get('/owners/:OwnerId/assets', assetsController.getAssetsByOwner);

module.exports = router;

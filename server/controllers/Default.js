'use strict';

var utils = require('../utils/writer.js');
var Default = require('../service/DefaultService');

module.exports.assetsAllGET = function assetsAllGET (req, res, next) {
  Default.assetsAllGET()
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.assetsAssetIdDELETE = function assetsAssetIdDELETE (req, res, next, assetId) {
  Default.assetsAssetIdDELETE(assetId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.assetsAssetIdExistsGET = function assetsAssetIdExistsGET (req, res, next, assetId) {
  Default.assetsAssetIdExistsGET(assetId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.assetsAssetIdGET = function assetsAssetIdGET (req, res, next, assetId) {
  Default.assetsAssetIdGET(assetId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.assetsAssetIdHistoryGET = function assetsAssetIdHistoryGET (req, res, next, assetId) {
  Default.assetsAssetIdHistoryGET(assetId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.assetsAssetIdPUT = function assetsAssetIdPUT (req, res, next, body, assetId) {
  Default.assetsAssetIdPUT(body, assetId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.assetsAssetIdTransferPOST = function assetsAssetIdTransferPOST (req, res, next, body, assetId) {
  Default.assetsAssetIdTransferPOST(body, assetId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.assetsPOST = function assetsPOST (req, res, next, body) {
  Default.assetsPOST(body)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

module.exports.ownersOwnerIdAssetsGET = function ownersOwnerIdAssetsGET (req, res, next, ownerId) {
  Default.ownersOwnerIdAssetsGET(ownerId)
    .then(function (response) {
      utils.writeJson(res, response);
    })
    .catch(function (response) {
      utils.writeJson(res, response);
    });
};

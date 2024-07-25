'use strict';


/**
 * Get all assets in the ledger
 *
 * returns List
 **/
exports.assetsAllGET = function() {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "NewOwner" : {
    "Entity" : "Entity",
    "ReceivedDate" : "2000-01-23",
    "OwnerLocation" : "OwnerLocation"
  },
  "TransferTransaction" : {
    "Details" : "Details",
    "TransactionID" : "TransactionID"
  }
}, {
  "NewOwner" : {
    "Entity" : "Entity",
    "ReceivedDate" : "2000-01-23",
    "OwnerLocation" : "OwnerLocation"
  },
  "TransferTransaction" : {
    "Details" : "Details",
    "TransactionID" : "TransactionID"
  }
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Delete an asset by ID
 *
 * assetId String 
 * no response value expected for this operation
 **/
exports.assetsAssetIdDELETE = function(assetId) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Check if an asset exists by ID
 *
 * assetId String 
 * returns inline_response_200
 **/
exports.assetsAssetIdExistsGET = function(assetId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "exists" : true
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Retrieve an asset's information by ID
 *
 * assetId String 
 * returns Asset
 **/
exports.assetsAssetIdGET = function(assetId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = {
  "Origin" : {
    "OriginLocation" : "OriginLocation",
    "Certifications" : [ "Certifications", "Certifications" ],
    "Farm" : "Farm",
    "HarvestDate" : "2000-01-23"
  },
  "CurrentOwner" : {
    "Entity" : "Entity",
    "ReceivedDate" : "2000-01-23",
    "OwnerLocation" : "OwnerLocation"
  },
  "TransactionHistory" : [ {
    "Details" : "Details",
    "From" : "From",
    "To" : "To",
    "Timestamp" : "2000-01-23T04:56:07.000+00:00",
    "TransactionID" : "TransactionID"
  }, {
    "Details" : "Details",
    "From" : "From",
    "To" : "To",
    "Timestamp" : "2000-01-23T04:56:07.000+00:00",
    "TransactionID" : "TransactionID"
  } ],
  "Packaging" : {
    "Packager" : "Packager",
    "PackageType" : "PackageType",
    "PackageDate" : "2000-01-23",
    "PackagingLocation" : "PackagingLocation"
  },
  "ItemName" : "ItemName",
  "Shipment" : {
    "ShipmentID" : "ShipmentID",
    "Origin" : "Origin",
    "Status" : "Status",
    "Destination" : "Destination",
    "ArrivalDate" : "2000-01-23",
    "Shipper" : "Shipper",
    "DepartureDate" : "2000-01-23"
  },
  "ItemID" : "ItemID",
  "Processing" : {
    "ProcessType" : "ProcessType",
    "Processor" : "Processor",
    "ProcessingLocation" : "ProcessingLocation",
    "ProcessDate" : "2000-01-23T04:56:07.000+00:00"
  }
};
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Get the history of a specific asset
 *
 * assetId String 
 * returns List
 **/
exports.assetsAssetIdHistoryGET = function(assetId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ [ {
  "Details" : "Details",
  "From" : "From",
  "To" : "To",
  "Timestamp" : "2000-01-23T04:56:07.000+00:00",
  "TransactionID" : "TransactionID"
}, {
  "Details" : "Details",
  "From" : "From",
  "To" : "To",
  "Timestamp" : "2000-01-23T04:56:07.000+00:00",
  "TransactionID" : "TransactionID"
} ], [ {
  "Details" : "Details",
  "From" : "From",
  "To" : "To",
  "Timestamp" : "2000-01-23T04:56:07.000+00:00",
  "TransactionID" : "TransactionID"
}, {
  "Details" : "Details",
  "From" : "From",
  "To" : "To",
  "Timestamp" : "2000-01-23T04:56:07.000+00:00",
  "TransactionID" : "TransactionID"
} ] ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


/**
 * Update an existing asset
 *
 * body Asset Updated asset details
 * assetId String 
 * no response value expected for this operation
 **/
exports.assetsAssetIdPUT = function(body,assetId) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Transfer ownership of an asset
 *
 * body Transfer New owner details
 * assetId String 
 * no response value expected for this operation
 **/
exports.assetsAssetIdTransferPOST = function(body,assetId) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Create a new asset
 *
 * body Asset Asset
 * no response value expected for this operation
 **/
exports.assetsPOST = function(body) {
  return new Promise(function(resolve, reject) {
    resolve();
  });
}


/**
 * Get all assets owned by a specific entity
 *
 * ownerId String 
 * returns List
 **/
exports.ownersOwnerIdAssetsGET = function(ownerId) {
  return new Promise(function(resolve, reject) {
    var examples = {};
    examples['application/json'] = [ {
  "Origin" : {
    "OriginLocation" : "OriginLocation",
    "Certifications" : [ "Certifications", "Certifications" ],
    "Farm" : "Farm",
    "HarvestDate" : "2000-01-23"
  },
  "CurrentOwner" : {
    "Entity" : "Entity",
    "ReceivedDate" : "2000-01-23",
    "OwnerLocation" : "OwnerLocation"
  },
  "TransactionHistory" : [ {
    "Details" : "Details",
    "From" : "From",
    "To" : "To",
    "Timestamp" : "2000-01-23T04:56:07.000+00:00",
    "TransactionID" : "TransactionID"
  }, {
    "Details" : "Details",
    "From" : "From",
    "To" : "To",
    "Timestamp" : "2000-01-23T04:56:07.000+00:00",
    "TransactionID" : "TransactionID"
  } ],
  "Packaging" : {
    "Packager" : "Packager",
    "PackageType" : "PackageType",
    "PackageDate" : "2000-01-23",
    "PackagingLocation" : "PackagingLocation"
  },
  "ItemName" : "ItemName",
  "Shipment" : {
    "ShipmentID" : "ShipmentID",
    "Origin" : "Origin",
    "Status" : "Status",
    "Destination" : "Destination",
    "ArrivalDate" : "2000-01-23",
    "Shipper" : "Shipper",
    "DepartureDate" : "2000-01-23"
  },
  "ItemID" : "ItemID",
  "Processing" : {
    "ProcessType" : "ProcessType",
    "Processor" : "Processor",
    "ProcessingLocation" : "ProcessingLocation",
    "ProcessDate" : "2000-01-23T04:56:07.000+00:00"
  }
}, {
  "Origin" : {
    "OriginLocation" : "OriginLocation",
    "Certifications" : [ "Certifications", "Certifications" ],
    "Farm" : "Farm",
    "HarvestDate" : "2000-01-23"
  },
  "CurrentOwner" : {
    "Entity" : "Entity",
    "ReceivedDate" : "2000-01-23",
    "OwnerLocation" : "OwnerLocation"
  },
  "TransactionHistory" : [ {
    "Details" : "Details",
    "From" : "From",
    "To" : "To",
    "Timestamp" : "2000-01-23T04:56:07.000+00:00",
    "TransactionID" : "TransactionID"
  }, {
    "Details" : "Details",
    "From" : "From",
    "To" : "To",
    "Timestamp" : "2000-01-23T04:56:07.000+00:00",
    "TransactionID" : "TransactionID"
  } ],
  "Packaging" : {
    "Packager" : "Packager",
    "PackageType" : "PackageType",
    "PackageDate" : "2000-01-23",
    "PackagingLocation" : "PackagingLocation"
  },
  "ItemName" : "ItemName",
  "Shipment" : {
    "ShipmentID" : "ShipmentID",
    "Origin" : "Origin",
    "Status" : "Status",
    "Destination" : "Destination",
    "ArrivalDate" : "2000-01-23",
    "Shipper" : "Shipper",
    "DepartureDate" : "2000-01-23"
  },
  "ItemID" : "ItemID",
  "Processing" : {
    "ProcessType" : "ProcessType",
    "Processor" : "Processor",
    "ProcessingLocation" : "ProcessingLocation",
    "ProcessDate" : "2000-01-23T04:56:07.000+00:00"
  }
} ];
    if (Object.keys(examples).length > 0) {
      resolve(examples[Object.keys(examples)[0]]);
    } else {
      resolve();
    }
  });
}


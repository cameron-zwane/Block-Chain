'use strict';

const { Contract } = require('fabric-contract-api');

const AssetProperties = Object.freeze({
    ORIGIN: 0,
    PROCESSING: 1,
    PACKAGING: 2,
    SHIPMENT: 3,
    CURRENTOWNER: 4,
    TRANSACTIONHISTORY: 5
});

class AssetTransfer extends Contract {

    async InitLedger(ctx) {
        const assets = [
            {
                ItemID: "1234567890",
                ItemName: "Organic Fair-Trade Coffee Beans",
                Origin: {
                    Farm: "Green Valley Farm",
                    OriginLocation: "Ethiopia",
                    Certifications: ["Organic", "Fair Trade"],
                    HarvestDate: "2024-04-15"
                },
                Processing: {
                    Processor: "Ethiopian Coffee Processing Ltd.",
                    ProcessingLocation: "Addis Ababa, Ethiopia",
                    ProcessDate: "2024-04-20",
                    ProcessType: "Wet Processing"
                },
                Packaging: {
                    Packager: "Global Coffee Packers Inc.",
                    PackagingLocation: "Nairobi, Kenya",
                    PackageDate: "2024-04-25",
                    PackageType: "Eco-friendly Bags"
                },
                Shipment: {
                    Shipper: "International Shippers Co.",
                    ShipmentID: "SHIP987654321",
                    Origin: "Nairobi, Kenya",
                    Destination: "New York, USA",
                    DepartureDate: "2024-05-01",
                    ArrivalDate: "2024-05-10",
                    Status: "In Transit"
                },
                CurrentOwner: {
                    Entity: "Coffee Distributors USA",
                    OwnerLocation: "New York, USA",
                    ReceivedDate: "2024-05-10"
                },
                TransactionHistory: [
                    {
                        TransactionID: "TXN12345",
                        Timestamp: "2024-04-15T08:30:00Z",
                        From: "Green Valley Farm",
                        To: "Ethiopian Coffee Processing Ltd.",
                        Details: "Harvested and sent for processing"
                    },
                    {
                        TransactionID: "TXN12346",
                        Timestamp: "2024-04-20T10:00:00Z",
                        From: "Ethiopian Coffee Processing Ltd.",
                        To: "Global Coffee Packers Inc.",
                        Details: "Processed and sent for packaging"
                    },
                    {
                        TransactionID: "TXN12347",
                        Timestamp: "2024-04-25T15:00:00Z",
                        From: "Global Coffee Packers Inc.",
                        To: "International Shippers Co.",
                        Details: "Packaged and sent for shipment"
                    },
                    {
                        TransactionID: "TXN12348",
                        Timestamp: "2024-05-10T12:00:00Z",
                        From: "International Shippers Co.",
                        To: "Coffee Distributors USA",
                        Details: "Shipped and received"
                    }
                ]
            },
        ];

        for (const asset of assets) {
            asset.DocType = 'asset';
            await ctx.stub.putState(asset.ItemID, Buffer.from(JSON.stringify(asset)));
            console.info(`Asset ${asset.ItemID} initialized`);
        }
    }

    async TestMethod(ctx) {
        return JSON.stringify(ctx.clientIdentity.getMSPID())
    }

    // CreateAsset issues a new asset to the world state with given details.
    async CreateAsset(
        ctx, 
        itemID, 
        itemName, 
        origin,
        processing,
        packaging,
        shipment,
        currentOwner,
        transactionHistory
    ) {
        origin = JSON.parse(origin);
        processing = JSON.parse(processing);
        packaging = JSON.parse(packaging);
        shipment = JSON.parse(shipment);
        currentOwner = JSON.parse(currentOwner);
        transactionHistory = JSON.parse(transactionHistory);
        if (
            await this.HasCorrectKeys(origin, AssetProperties.ORIGIN) 
            && await this.HasCorrectKeys(processing, AssetProperties.PROCESSING)
            && await this.HasCorrectKeys(packaging, AssetProperties.PACKAGING)
            && await this.HasCorrectKeys(shipment, AssetProperties.SHIPMENT)
            && await this.HasCorrectKeys(currentOwner, AssetProperties.CURRENTOWNER)
            && await this.HasCorrectKeys(transactionHistory, AssetProperties.TRANSACTIONHISTORY)
        ) {
            const asset = {
                ItemID: itemID,
                ItemName: itemName,
                Origin: origin,
                Processing: processing,
                Packaging: packaging,
                Shipment: shipment,
                CurrentOwner: currentOwner,
                TransactionHistory: transactionHistory,
            };
            await ctx.stub.putState(itemID, Buffer.from(JSON.stringify(asset)));
            return JSON.stringify(asset);
        }
        else { 
            throw new Error(`Incorrect parameter structure.`);
        }
    }

    // ReadAsset returns the asset stored in the world state with given id.
    async ReadAsset(ctx, itemID) {
        const assetJSON = await ctx.stub.getState(itemID); // get the asset from chaincode state
        if (!assetJSON || assetJSON.length === 0) {
            throw new Error(`The asset ${itemID} does not exist`);
        }
        return assetJSON.toString();
    }

    // // UpdateAsset updates an existing asset in the world state with provided parameters.
    async UpdateAsset(
        ctx, 
        itemID, 
        itemName, 
        origin,
        processing,
        packaging,
        shipment ,
        currentOwner,
        transactionHistory
    ) {
        const exists = await this.AssetExists(ctx, itemID);
        if (!exists) {
            throw new Error(`The asset ${itemID} does not exist`);
        }

        origin = JSON.parse(origin);
        processing = JSON.parse(processing);
        packaging = JSON.parse(packaging);
        shipment = JSON.parse(shipment);
        currentOwner = JSON.parse(currentOwner);
        transactionHistory = JSON.parse(transactionHistory);
        if (
            await this.HasCorrectKeys(origin, AssetProperties.ORIGIN) 
            && await this.HasCorrectKeys(processing, AssetProperties.PROCESSING)
            && await this.HasCorrectKeys(packaging, AssetProperties.PACKAGING)
            && await this.HasCorrectKeys(shipment, AssetProperties.SHIPMENT)
            && await this.HasCorrectKeys(currentOwner, AssetProperties.CURRENTOWNER)
            && await this.HasCorrectKeys(transactionHistory, AssetProperties.TRANSACTIONHISTORY)
        ) {
            // overwriting original asset with new asset
            const updatedAsset = {
                ItemID: itemID,
                ItemName: itemName,
                Origin: origin,
                Processing: processing,
                Packaging: packaging,
                Shipment: shipment,
                CurrentOwner: currentOwner,
                TransactionHistory: transactionHistory,
            };
            return ctx.stub.putState(itemID, Buffer.from(JSON.stringify(updatedAsset)));
        }
        else { 
            throw new Error(`Incorrect parameter structure.`);
        }
    }

    //Moves asset from its origin to the processor
    async ProcessAsset(
        ctx, 
        itemID, 
        processor,
        processingLocation,
        processDate,
        processType,
        transactionID
    ) {
        const assetString = await this.ReadAsset(ctx, itemID);
        const asset = JSON.parse(assetString);
        asset.Processing = {
            Processor: processor,
            ProcessingLocation: processingLocation,
            ProcessDate: processDate,
            ProcessType: processType
        };
        const newOwner = JSON.stringify({
            Entity: processor,
            OwnerLocation: processingLocation,
            ReceivedDate: processDate
        });
        await this.TransferAsset(ctx, itemID, newOwner, transactionID, "Harvested and sent for processing");
        return ctx.stub.putState(itemID, Buffer.from(JSON.stringify(asset)));
    }

    //Moves asset from its processor to the packager
    async PackageAsset(
        ctx, 
        itemID, 
        packager,
        packagingLocation,
        packageDate,
        packageType,
        transactionID
    ) {
        const assetString = await this.ReadAsset(ctx, itemID);
        const asset = JSON.parse(assetString);
        asset.Packaging = {
            Packager: packager,
            PackagingLocation: packagingLocation,
            PackageDate: packageDate,
            PackageType: packageType
        };
        const newOwner = JSON.stringify({
            Entity: packager,
            OwnerLocation: packagingLocation,
            ReceivedDate: packageDate
        });
        await this.TransferAsset(ctx, itemID, newOwner, transactionID, "Processed and sent for packaging");
        return ctx.stub.putState(itemID, Buffer.from(JSON.stringify(asset)));
    }

    //Moves asset from its packager to the shipper
    async ShipAsset(
        ctx, 
        itemID, 
        shipper,
        shipmentID,
        destination,
        departureDate,
        status,
        transactionID
    ) {
        const assetString = await this.ReadAsset(ctx, itemID);
        const asset = JSON.parse(assetString);
        asset.Shipment = {
            Shipper: shipper,
            ShipmentID: shipmentID,
            Origin: asset.CurrentOwner.OwnerLocation,
            Destination: destination,
            DepartureDate: departureDate,
            ArrivalDate: "",
            Status: status
        };
        const newOwner = JSON.stringify({
            Entity: shipper,
            OwnerLocation: shipper,
            ReceivedDate: departureDate
        });
        await this.TransferAsset(ctx, itemID, newOwner, transactionID, "Packaged and sent for shipment");
        return ctx.stub.putState(itemID, Buffer.from(JSON.stringify(asset)));
    }

    //Moves asset from its shipper to its destination
    async CompleteShipment(
        ctx, 
        itemID, 
        recipient,
        arrivalDate,
        status,
        transactionID
    ) {
        const assetString = await this.ReadAsset(ctx, itemID);
        const asset = JSON.parse(assetString);
        asset.Shipment.ArrivalDate = arrivalDate;
        asset.Shipment.Status =  status;
        const newOwner = JSON.stringify({
            Entity: recipient,
            OwnerLocation: asset.Shipment.Destination,
            ReceivedDate: arrivalDate
        });
        await this.TransferAsset(ctx, itemID, newOwner, transactionID, "Shipped and received");
        return ctx.stub.putState(itemID, Buffer.from(JSON.stringify(asset)));
    }

    // DeleteAsset deletes an given asset from the world state.
    async DeleteAsset(ctx, itemID) {
        const exists = await this.AssetExists(ctx, itemID);
        if (!exists) {
            throw new Error(`The asset ${itemID} does not exist`);
        }
        return ctx.stub.deleteState(itemID);
    }

    // AssetExists returns true when asset with given ID exists in world state.
    async AssetExists(ctx, itemID) {
        const assetJSON = await ctx.stub.getState(itemID);
        return assetJSON && assetJSON.length > 0;
    }

    // TransferAsset updates the owner field of asset with given id in the world state.
    async TransferAsset(
        ctx, 
        itemID, 
        newOwner,
        transactionID,
        details,
    ) {
        newOwner = JSON.parse(newOwner);
        if (await this.HasCorrectKeys(newOwner)) {
            const assetString = await this.ReadAsset(ctx, itemID);
            const asset = JSON.parse(assetString);
            asset.TransactionHistory.push({
                TransactionID: transactionID,
                Timestamp: (new Date()).toISOString(),
                From: asset.CurrentOwner.Entity,
                To: newOwner.Entity,
                Details: details
            });
            asset.CurrentOwner = newOwner;
            return ctx.stub.putState(itemID, Buffer.from(JSON.stringify(asset)));
        }
        else { 
            throw new Error(`Incorrect parameter structure.`);
        }

    }

    // GetAllResults returns all the results from an iterator
    async GetAllResults(iterator, isHistory) {
		const allResults = [];
		let res = await iterator.next();
		while (!res.done) {
			if (res.value && res.value.value.toString()) {
				let jsonRes = {};
				console.log(res.value.value.toString('utf8'));
				if (isHistory && isHistory === true) {
					jsonRes.TxId = res.value.tx_id;
					jsonRes.Timestamp = res.value.timestamp;
					try {
						jsonRes.Value = JSON.parse(res.value.value.toString('utf8'));
					} catch (err) {
						console.log(err);
						jsonRes.Value = res.value.value.toString('utf8');
					}
				} else {
					jsonRes.Key = res.value.key;
					try {
						jsonRes.Record = JSON.parse(res.value.value.toString('utf8'));
					} catch (err) {
						console.log(err);
						jsonRes.Record = res.value.value.toString('utf8');
					}
				}
				allResults.push(jsonRes);
			}
			res = await iterator.next();
		}
		iterator.close();
		return allResults;
	}

    // GetAllAssets returns all assets found in the world state.
    async GetAllAssets(ctx) {
        const iterator = await ctx.stub.getStateByRange('', '');
        const allResults = await this.GetAllResults(iterator, false);

        return JSON.stringify(allResults);
    }

    // GetAssetHistory returns the chain of custody for an asset since issuance.
	async GetAssetHistory(ctx, itemID) {
        const exists = await this.AssetExists(ctx, itemID);
        if (!exists) {
            throw new Error(`The asset ${itemID} does not exist`);
        }

		const iterator = await ctx.stub.getHistoryForKey(itemID);
		const results = await this.GetAllResults(iterator, true);

		return JSON.stringify(results);
	}

    // GetQueryResultForQueryString executes the passed in query string.
	async GetQueryResultForQueryString(ctx, queryString) {

		const iterator = await ctx.stub.getQueryResult(queryString);
		const results = await this.GetAllResults(iterator, false);

		return JSON.stringify(results);
	}

    // GetAssetsByOwner returns all assets owned by a specified owner.
    async GetAssetsByOwner(ctx, ownerEntity) {
		let queryString = {};
		queryString.selector = {};
		queryString.selector.DocType = 'asset';
        queryString.selector.CurrentOwner = {}
		queryString.selector.CurrentOwner.Entity = ownerEntity;
		return await this.GetQueryResultForQueryString(ctx, JSON.stringify(queryString)); 
	}

    async HasCorrectKeys(obj, propertyType) {
        switch(propertyType) {
            case AssetProperties.ORIGIN:
                return (
                    obj.hasOwnProperty("Farm") 
                    && obj.hasOwnProperty("OriginLocation") 
                    && obj.hasOwnProperty("Certifications") 
                    && obj.hasOwnProperty("HarvestDate")
                );
            case AssetProperties.PROCESSING:
                return (
                    obj.hasOwnProperty("Processor") 
                    && obj.hasOwnProperty("ProcessingLocation") 
                    && obj.hasOwnProperty("ProcessDate") 
                    && obj.hasOwnProperty("ProcessType")
                );
            case AssetProperties.PACKAGING:
                return (
                    obj.hasOwnProperty("Packager") 
                    && obj.hasOwnProperty("PackagingLocation") 
                    && obj.hasOwnProperty("PackageDate") 
                    && obj.hasOwnProperty("PackageType")
                );
            case AssetProperties.SHIPMENT:
                return (
                    obj.hasOwnProperty("Shipper") 
                    && obj.hasOwnProperty("ShipmentID") 
                    && obj.hasOwnProperty("Origin") 
                    && obj.hasOwnProperty("Destination") 
                    && obj.hasOwnProperty("DepartureDate") 
                    && obj.hasOwnProperty("ArrivalDate") 
                    && obj.hasOwnProperty("Status")
                );
            case AssetProperties.CURRENTOWNER:
                return (
                    obj.hasOwnProperty("Entity") 
                    && obj.hasOwnProperty("OwnerLocation") 
                    && obj.hasOwnProperty("ReceivedDate") 
                );
            case AssetProperties.TRANSACTIONHISTORY:
                if (!Array.isArray(obj)) {
                    return false;
                }
                return obj.every((item) => 
                    item.hasOwnProperty("TransactionID") 
                    && item.hasOwnProperty("Timestamp") 
                    && item.hasOwnProperty("From") 
                    && item.hasOwnProperty("To") 
                    && item.hasOwnProperty("Details") 
                )
            default:
                return false
        }
    }
}

module.exports = AssetTransfer;

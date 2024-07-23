'use strict';

const { Contract } = require('fabric-contract-api');

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
            await ctx.stub.putState(asset.ItemID, Buffer.from(JSON.stringify(asset)));
            console.info(`Asset ${asset.ItemID} initialized`);
        }
    }

    // CreateAsset issues a new asset to the world state with given details.
    async CreateAsset(
        ctx, 
        itemID, 
        itemName, 
        origin = {Farm, OriginLocation, Certifications, HarvestDate},
        processing = {Processor, ProcessingLocation, ProcessDate, ProcessType},
        packaging = {Packager, PackagingLocation, PackageDate, PackageType},
        shipment = {Shipper, ShipmentID, Origin, Destination, DepartureDate, ArrivalDate},
        currentOwner = {Entity, OwnerLocation, ReceivedDate},
        transactionHistory = [{TransactionID, Timestamp, From, To, Details}]
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
        origin = {Farm, OriginLocation, Certifications, HarvestDate},
        processing = {Processor, ProcessingLocation, ProcessDate, ProcessType},
        packaging = {Packager, PackagingLocation, PackageDate, PackageType},
        shipment = {Shipper, ShipmentID, Origin, Destination, DepartureDate, ArrivalDate},
        currentOwner = {Entity, OwnerLocation, ReceivedDate},
        transactionHistory = [{TransactionID, Timestamp, From, To, Details}]
    ) {
        const exists = await this.AssetExists(ctx, itemID);
        if (!exists) {
            throw new Error(`The asset ${itemID} does not exist`);
        }

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

    // // TransferAsset updates the owner field of asset with given id in the world state.
    async TransferAsset(
        ctx, 
        itemID, 
        newOwner = {Entity, OwnerLocation, ReceivedDate},
        transferTransaction = {transactionID, details}
    ) {
        const assetString = await this.ReadAsset(ctx, itemID);
        const asset = JSON.parse(assetString);
        asset.TransactionHistory.push({
            TransactionID: transferTransaction.transactionID,
            Timestamp: (new Date()).toISOString(),
            From: asset.CurrentOwner.Entity,
            To: newOwner.Entity,
            Details: transferTransaction.details
        });
        asset.CurrentOwner = newOwner;
        return ctx.stub.putState(itemID, Buffer.from(JSON.stringify(asset)));
    }

    // GetAllAssets returns all assets found in the world state.
    async GetAllAssets(ctx) {
        const allResults = [];
        // range query with empty string for startKey and endKey does an open-ended query of all assets in the chaincode namespace.
        const iterator = await ctx.stub.getStateByRange('', '');
        let result = await iterator.next();
        while (!result.done) {
            const strValue = Buffer.from(result.value.value.toString()).toString('utf8');
            let record;
            try {
                record = JSON.parse(strValue);
            } catch (err) {
                console.log(err);
                record = strValue;
            }
            allResults.push({ Key: result.value.key, Record: record });
            result = await iterator.next();
        }
        return JSON.stringify(allResults);
    }


}

module.exports = AssetTransfer;

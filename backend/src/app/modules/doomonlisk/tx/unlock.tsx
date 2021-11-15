const { BaseAsset } = require("lisk-sdk");
const { createUnlockControlsSchema } = require('../schemas');
const { unlockControlsID } = require('../constants');

// extend base asset to implement the custom asset
class unlockControls extends BaseAsset { 
  
    name = "unlockControls"; 
    id = unlockControlsID; 
    schema = createUnlockControlsSchema;

    
    async apply({
		asset,
		transaction,
		stateStore,
	}) {
        const sender = await stateStore.account.get(transaction.senderAddress);
        const amount = await stateStore.account.get(transaction.amount);
       
        const wrongAccount = asset.friends.find(f => f === HOST_PAYMENT_ADDRESS);
        if (sameAccount) {
            throw new Error('You cannot add yourself to your own friend list.');
        }


        // Add blocks to the timer
        sender.doomonlisk.config.blocksLeft = Math.round(amount);
        // Add default name
        sender.doomonlisk.config.playerName = "Anonymous";
       
        // Set the deposit based on number of friends, 10 + friends.length * 2
        const deposit = BigInt(BASE_RECOVERY_DEPOSIT) + BigInt(transactions.convertLSKToBeddows((sender.srs.config.friends.length * FRIEND_FACTOR_FEE).toString()));
        sender.srs.config.deposit = deposit;
        // Save the value in stateStore
        await stateStore.account.set(sender.address, sender);
    }


}

module.exports = unlockControls; 

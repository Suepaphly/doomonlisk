const { BaseAsset } = require("lisk-sdk");
const { createUnlockControlsSchema } = require('../schemas');
const { unlockControlsID, HOST_PAYMENT_ADDRESS } = require('../constants');

// extend base asset to implement the custom asset
class unlockControls extends BaseAsset { 
  
    name = "unlockControls"; 
    id = unlockControlsID; 
    schema = createUnlockControlsSchema;

    
    async apply({
		asset,
		transaction,
		stateStore,
        reducerHandler,
	}) {
        const sender = await stateStore.account.get(transaction.senderAddress);
        const amount = await stateStore.account.get(transaction.amount);
        const name = await stateStore.account.get(transaction.playerName);
       
        if (sender === HOST_PAYMENT_ADDRESS) {
            throw new Error('You must pay the Host Address to Play.');
        }


        // Add blocks to the timer
        sender.doomonlisk.config.blocksLeft = Math.round(amount);
        // Add default name
        if(name){
            sender.doomonlisk.config.playerName = name;
        } else {
            sender.doomonlisk.config.playerName = "NewPlayer";
        }

        const startPlay = await reducerHandler.invoke('doomonlisk:openLock');

        await stateStore.account.set(sender.address, sender);
    }


}

module.exports = unlockControls; 

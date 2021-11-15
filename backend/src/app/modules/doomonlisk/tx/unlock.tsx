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

        // Add blocks to the timer
        sender.doomonlisk.config.blocksLeft = 0;
        // Add default name
        sender.doomonlisk.config.playerName = "Anonymous";
       
        // Save the value in stateStore
        await stateStore.account.set(sender.address, sender);
    }


}

module.exports = unlockControls; 

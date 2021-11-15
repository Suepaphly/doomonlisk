const { BaseAsset } = require("lisk-sdk");
const { createRecoverySchema } = require('../schemas');

// extend base asset to implement the custom asset
class unlockControls extends BaseAsset { 
  
    name = "unlockControls"; 
    id = 0; 
    schema = createRecoverySchema;

    
}

module.exports = unlockControls; 

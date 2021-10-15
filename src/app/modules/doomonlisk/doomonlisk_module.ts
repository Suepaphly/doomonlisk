/* eslint-disable class-methods-use-this */

import {
    BaseModule,
    AfterBlockApplyContext,
    TransactionApplyContext,
    BeforeBlockApplyContext,
    AfterGenesisBlockApplyContext,
    // GenesisConfig
} from 'lisk-sdk';

const fs = require("fs");
const jimp = require("jimp");

require("emulators");

const emulators = global.emulators;
emulators.pathPrefix = "./";

const bundle = fs.readFileSync("/home/lisk/doomonlisk/src/app/modules/doomonlisk/doom.jsdos");

export class DoomonliskModule extends BaseModule {
    public actions = {
        // Example below
        // getBalance: async (params) => this._dataAccess.account.get(params.address).token.balance,
        // getBlockByID: async (params) => this._dataAccess.blocks.get(params.id),
    };
    public reducers = {
        // Example below
        // getBalance: async (
		// 	params: Record<string, unknown>,
		// 	stateStore: StateStore,
		// ): Promise<bigint> => {
		// 	const { address } = params;
		// 	if (!Buffer.isBuffer(address)) {
		// 		throw new Error('Address must be a buffer');
		// 	}
		// 	const account = await stateStore.account.getOrDefault<TokenAccount>(address);
		// 	return account.token.balance;
		// },
    };
    public name = 'doomonlisk';
    public transactionAssets = [];
    public events = [
        // Example below
        // 'doomonlisk:newBlock',
    ];
    public id = 1000;

     public constructor(genesisConfig: GenesisConfig) {
         super(genesisConfig);
	    emulators
	    .dosDirect(bundle)
	    .then((ci) => {
		let rgb = new Uint8Array(0);
		ci.events().onFrame((frame) => {
		    rgb = frame;
		});

		// capture the screen after 3 sec
		console.log("Will capture screen after 3 sec...");
   		setTimeout(() => {
		    const width = ci.width();
		    const height = ci.height();

		    const rgba = new Uint8Array(width * height * 4);
		    for (let next = 0; next < width * height; ++next) {
			rgba[next * 4 + 0] = rgb[next * 3 + 0];
			rgba[next * 4 + 1] = rgb[next * 3 + 1];
			rgba[next * 4 + 2] = rgb[next * 3 + 2];
			rgba[next * 4 + 3] = 255;
		    }
			
				console.log("processed");
		    new jimp({ data: rgba, width, height }, (err, image) => {
			image.write("./screenshot.png", () => {
			    
				console.log("Captured");
				ci.exit();
				
			});
		    });	
        	}, 30000);	
	    })
	    .catch(console.error);	 
     }

    // Lifecycle hooks
    public async beforeBlockApply(_input: BeforeBlockApplyContext) {
        // Get any data from stateStore using block info, below is an example getting a generator
        // const generatorAddress = getAddressFromPublicKey(_input.block.header.generatorPublicKey);
		// const generator = await _input.stateStore.account.get<TokenAccount>(generatorAddress);
    }

    public async afterBlockApply(_input: AfterBlockApplyContext) {
        // Get any data from stateStore using block info, below is an example getting a generator
        // const generatorAddress = getAddressFromPublicKey(_input.block.header.generatorPublicKey);
		// const generator = await _input.stateStore.account.get<TokenAccount>(generatorAddress);
    }

    public async beforeTransactionApply(_input: TransactionApplyContext) {
        // Get any data from stateStore using transaction info, below is an example
        // const sender = await _input.stateStore.account.getOrDefault<TokenAccount>(_input.transaction.senderAddress);
    }

    public async afterTransactionApply(_input: TransactionApplyContext) {
        // Get any data from stateStore using transaction info, below is an example
        // const sender = await _input.stateStore.account.getOrDefault<TokenAccount>(_input.transaction.senderAddress);
    }

    public async afterGenesisBlockApply(_input: AfterGenesisBlockApplyContext) {
        // Get any data from genesis block, for example get all genesis accounts
        // const genesisAccounts = genesisBlock.header.asset.accounts;
    }
}

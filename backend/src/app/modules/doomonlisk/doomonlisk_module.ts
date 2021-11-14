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

const bundle = fs.readFileSync("/home/lisk/doomonlisk/backend/src/app/modules/doomonlisk/doom.jsdos");



export class DoomonliskModule extends BaseModule {


    private currentFrame : Uint8Array;

    private emu = emulators
        .dosDirect(bundle)
        .then((ci) => {
            let frameCount = 0;
            let rgb = new Uint8Array(0);
            this.ci = ci;
            ci.events().onFrame((frame) => {
                rgb = frame;

                const width = ci.width();
                const height = ci.height();
            
                const rgba = new Uint8Array(width * height * 4);
                for (let next = 0; next < width * height; ++next) {
                    rgba[next * 4 + 0] = rgb[next * 3 + 0];
                    rgba[next * 4 + 1] = rgb[next * 3 + 1];
                    rgba[next * 4 + 2] = rgb[next * 3 + 2];
                    rgba[next * 4 + 3] = 255;
                }
            
                this.currentFrame = rgba;
                //this._channel.publish('doomonlisk:subscribeFrame', { data : rgba });
                //This would be cool, if it worked. 

            });
/* Works
            setTimeout(() => {
                ci.sendKeyEvent(257, true);
                ci.sendKeyEvent(257, false);
            }, 10000);
*/
        })
        .catch(console.error);

    private pressEnter () {
        this.ci.sendKeyEvent(257, true);
        this.ci.sendKeyEvent(257, false);
    }
    private pressUp () {
        this.ci.sendKeyEvent(265, true);
        this.ci.sendKeyEvent(265, false);
    }
    private pressDown () {
        this.ci.sendKeyEvent(264, true);
        this.ci.sendKeyEvent(264, false);
    }
    private pressLeft () {
        this.ci.sendKeyEvent(263, true);
        this.ci.sendKeyEvent(263, false);
    }
    private pressRight () {
        this.ci.sendKeyEvent(262, true);
        this.ci.sendKeyEvent(262, false);
    }
    private pressCtrl () {
        this.ci.sendKeyEvent(341, true);
        this.ci.sendKeyEvent(341, false);
    }
    private toggleAltOn () {
        this.ci.sendKeyEvent(342, true);
        this.ci.sendKeyEvent(342, false);
    }
    private toggleAltOff () {
        this.ci.sendKeyEvent(342, true);
        this.ci.sendKeyEvent(342, false);
    }
    private pressTab () {
        this.ci.sendKeyEvent(258, true);
        this.ci.sendKeyEvent(258, false);
    }

    public actions = {
        getFrame: async () => { return this.currentFrame; },
        pEnter: async () => { this.pressEnter(); return 0; },
        pKeyW: async () => { this.pressUp(); return 0; },
        pKeyS: async () => { this.pressDown(); return 0; },
        pKeyA: async () => { this.pressLeft(); return 0; },
        pKeyD: async () => { this.pressRight(); return 0; },
        pKeyJ: async () => { this.pressCtrl(); return 0; },
        pKeyKOn: async () => { this.toggleAltOn(); return 0; },
        pKeyKOff: async () => { this.toggleAltOff(); return 0; },
        pKeyM: async () => { this.pressTab(); return 0; },
            

            


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
        //'doomonlisk:subscribeFrame',

    ];
    
    public id = 1000;

    public constructor(genesisConfig: GenesisConfig) {
        super(genesisConfig);

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

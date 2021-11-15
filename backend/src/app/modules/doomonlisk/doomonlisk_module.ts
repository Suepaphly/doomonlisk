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
                
                const imageData = new ImageData(Uint8ClampedArray.from(Object.values(rgba)), 320, 200);
                this.currentFrame = imageData;
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

    private pressEnterDown () {
        this.ci.sendKeyEvent(257, true);
    }
    private pressEnterUp () {
        this.ci.sendKeyEvent(257, false);
    }
    private pressUpDown () {
        this.ci.sendKeyEvent(265, true);
    }
    private pressUpUp () {
        this.ci.sendKeyEvent(265, false);
    }
    private pressDownDown () {
        this.ci.sendKeyEvent(264, true);
    }
    private pressDownUp () {
        this.ci.sendKeyEvent(264, false);
    }
    private pressLeftDown () {
        this.ci.sendKeyEvent(263, true);
    }
    private pressLeftUp () {
        this.ci.sendKeyEvent(263, false);
    }
    private pressRightDown () {
        this.ci.sendKeyEvent(262, true);
    }
    private pressRightUp () {
        this.ci.sendKeyEvent(262, false);
    }
    private pressCtrlDown () {
        this.ci.sendKeyEvent(341, true);
    }
    private pressCtrlUp () {
        this.ci.sendKeyEvent(341, false);
    }
    private pressAltDown () {
        this.ci.sendKeyEvent(342, true);
    }
    private pressAltUp () {
        this.ci.sendKeyEvent(342, false);
    }
    private pressTabDown () {
        this.ci.sendKeyEvent(258, true);
    }
    private pressTabUp () {
        this.ci.sendKeyEvent(258, false);
    }
    private pressSpaceDown () {
        this.ci.sendKeyEvent(32, true);
    }
    private pressSpaceUp () {
        this.ci.sendKeyEvent(32, false);
    }

    public actions = {
        getFrame: async () => { return this.currentFrame; },
        pEnterDown: async () => { this.pressEnterDown(); return 0; },
        pEnterUp: async () => { this.pressEnterUp(); return 0; },
        pKeyWDown: async () => { this.pressUpDown(); return 0; },
        pKeyWUp: async () => { this.pressUpUp(); return 0; },
        pKeySDown: async () => { this.pressDownDown(); return 0; },
        pKeySUp: async () => { this.pressDownUp(); return 0; },
        pKeyADown: async () => { this.pressLeftDown(); return 0; },
        pKeyAUp: async () => { this.pressLeftUp(); return 0; },
        pKeyDDown: async () => { this.pressRightDown(); return 0; },
        pKeyDUp: async () => { this.pressRightUp(); return 0; },
        pKeyJDown: async () => { this.pressCtrlDown(); return 0; },
        pKeyJUp: async () => { this.pressCtrlUp(); return 0; },
        pKeyMDown: async () => { this.pressTabDown(); return 0; },
        pKeyMUp: async () => { this.pressTabUp(); return 0; },
        pKeyKDown: async () => { this.pressAltDown(); return 0; },
        pKeyKUp: async () => { this.pressAltUp(); return 0; },
        pKeyFDown: async () => { this.pressSpaceDown(); return 0; },
        pKeyFUp: async () => { this.pressSpaceUp(); return 0; },
            

            


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
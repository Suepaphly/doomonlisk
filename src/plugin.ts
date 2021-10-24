import { BasePlugin } from 'lisk-sdk';
import type { BaseChannel, EventsDefinition, ActionsDefinition, PluginInfo } from 'lisk-sdk';

 /* eslint-disable class-methods-use-this */
 /* eslint-disable  @typescript-eslint/no-empty-function */
 export class LnsuiPlugin extends BasePlugin {
	// private _channel!: BaseChannel;

	public static get alias(): string {
		return 'lnsui';
	}

	// eslint-disable-next-line @typescript-eslint/class-literal-property-style
	public static get info(): PluginInfo {
		return {
			author: 'suepaphly',
			version: '0.1.0',
			name: 'playdoom',
		};
	}

	public get events(): EventsDefinition {
		return [
			// 'block:created',
			// 'block:missed'
		];
	}

	public get actions(): ActionsDefinition {
		return {
		// 	hello: async () => { hello: 'world' },
		};
	}

		public async load(_: BaseChannel): Promise<void> {
		// this._channel = channel;
		// this._channel.once('app:ready', () => {});
	}

	public async unload(): Promise<void> {}
}

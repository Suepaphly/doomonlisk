import { BasePlugin, PluginInfo, PluginOptionsWithAppConfig, EventsDefinition, ActionsDefinition } from 'lisk-sdk';
import type { BaseChannel, EventsDefinition, ActionsDefinition, SchemaWithDefault } from 'lisk-sdk';
import * as express from 'express';
import { join } from 'path';
import { Server } from 'http'; //a comment

const configSchema = {
	$id: '#/plugins/playdoom/tsconfig',
	type: 'object',
	properties: {
		applicationUrl: {
			type: 'string',
			format: 'uri',
			description: 'URL to connect',
		},
		port: {
			type: 'integer',
			minimum: 1,
			maximum: 65535,
		},
		host: {
			type: 'string',
			format: 'ip',
		},
	},
	required: [],
	default: {
		applicationUrl: 'ws://localhost:8000/ws',
		port: 4005,
		host: '127.0.0.1',
	},
};

interface PlayDoomPluginOptions extends PluginOptionsWithAppConfig {
	applicationUrl: string;
	port: number;
	host: string;
}


 /* eslint-disable class-methods-use-this */
 /* eslint-disable  @typescript-eslint/no-empty-function */
 export class PlaydoomPlugin extends BasePlugin {
	// private _channel!: BaseChannel;
	 
	 private _server!: Server;

	public static get alias(): string {
		return 'playdoom';
	}
	 

	// eslint-disable-next-line @typescript-eslint/class-literal-property-style
	public static get info(): PluginInfo {
		return {
			author: 'lisk',
			version: '0.1.0',
			name: 'playdoom',
		};
	}

	// eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
	public get defaults(): SchemaWithDefault {
		return {
			$id: '/plugins/playdoom/tsconfig',
			type: 'object',
			properties: {},
			required: [],
			default: {},
		}
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

		public async load(channel: BaseChannel): Promise<void> {
			this._channel = channel;
			setTimeout({
			let temp = await this._channel.invoke('doomonlisk:getFrame'); 
			console.log(temp);
			}, 2000);
	
			
		
		const config = {
			applicationUrl: this.options.applicationUrl,
		};
			
		const app = express();
		app.use(express.static(join(__dirname, '../../build')));
		app.get('/api/config.json', (_req, res) => res.json(config));
		this._server = app.listen(this.options.port, this.options.host);
	}

	public async unload(): Promise<void> {
	
		await new Promise<void>((resolve, reject) => {
			this._server.close(err => {
				if (err) {
					reject(err);
					return;
				}
				resolve();
			});
		});
	}
}

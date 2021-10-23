import { BasePlugin, PluginInfo, PluginOptionsWithAppConfig, EventsDefinition, ActionsDefinition } from 'lisk-sdk';
import type { BaseChannel, EventsDefinition, ActionsDefinition, SchemaWithDefault } from 'lisk-sdk';
import * as express from 'express';
import { join } from 'path';
import { Server } from 'http';




// eslint-disable-next-line
const packageJSON = require('../../package.json');


const configSchema = {
	$id: '#/plugins/lns-dashboard/config',
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
		applicationUrl: 'ws://localhost:8080/ws',
		port: 4005,
		host: '127.0.0.1',
	},
};

interface LNSDashboardPluginOptions extends PluginOptionsWithAppConfig {
	applicationUrl: string;
	port: number;
	host: string;
}


 /* eslint-disable class-methods-use-this */
 /* eslint-disable  @typescript-eslint/no-empty-function */
 export class PlaydoomPlugin extends BasePlugin {
	// private _channel!: BaseChannel;

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
			$id: '/plugins/plugin-playdoom/config',
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

		public async load(_: BaseChannel): Promise<void> {
		// this._channel = channel;
		// this._channel.once('app:ready', () => {});
	}

	public async unload(): Promise<void> {}
}

/* eslint-disable @typescript-eslint/no-empty-function */
import { Application } from 'lisk-sdk';
import { playdoom } from "./plugins/playdoom/playdoom_plugin";

// @ts-expect-error Unused variable error happens here until at least one module is registered
export const registerPlugins = (_app: Application): void => {
  
    app.registerPlugin(playdoom);
};

import { apiClient } from '@liskhq/lisk-client';
import { APIClient } from '@liskhq/lisk-api-client';
let clientCache : APIClient;

export const getClient = async () => {
  return await apiClient.createWSClient('ws://207.246.66.38:3024/ws');
};

const apiRequest = async () => {
  const client = await getClient();
  const blockAtHeight123 = await client.block.getByHeight(123);
  client.subscribe('app:block:new', ( data ) => {
    console.log('new block:',data);
  });
  return blockAtHeight123;
};

export const getFrame = async () => {
  const client = await getClient();
  return client.invoke<Uint8Array>("doomonlisk:getFrame");
};

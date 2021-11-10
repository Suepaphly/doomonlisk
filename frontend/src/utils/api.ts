import { apiClient } from '@liskhq/lisk-client';
import { APIClient } from '@liskhq/lisk-api-client';
let clientCache : APIClient;

const getClient = async () => {
  if (!clientCache) {
    clientCache = await apiClient.createWSClient('ws://localhost:8380/ws');
  }
  return clientCache;
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

const { apiClient, cryptography } = require('@liskhq/lisk-client');
const RPC_ENDPOINT = 'ws://localhost:8080/ws';

let clientCache;

export const getClient = async () => {
  if (!clientCache) {
clientCache = await apiClient.createWSClient(RPC_ENDPOINT);
  }
  return clientCache;
};

export const fetchFrame = async () => {
  const client = await getClient();
  return client.invoke('doomonlisk:getFrame');
};

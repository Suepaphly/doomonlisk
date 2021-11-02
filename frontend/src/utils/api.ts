import { apiClient } from "@liskhq/lisk-client";

const RPC_ENDPOINT = process.env.REACT_APP_NODE;

let clientCache: apiClient.APIClient;

export const getClient = async () => {
  if (!RPC_ENDPOINT) {
    throw new Error("No RPC endpoint defined");
  }
  if (!clientCache) {
    clientCache = await apiClient.createWSClient(RPC_ENDPOINT);
  }
  return clientCache;
};

  // @ts-ignore
  return null;
};

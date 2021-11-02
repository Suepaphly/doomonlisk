import { apiClient, cryptography } from "@liskhq/lisk-client";

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

export const getAccount = async (address: string): Promise<Account | null> => {
  // get account details based on Lisk (lsk) address
  const client = await getClient();
  const account = await client.account.get(
    cryptography.getAddressFromBase32Address(address)
  );
  // @ts-ignore
  return account || null;
};

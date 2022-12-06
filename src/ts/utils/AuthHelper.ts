import { AccountInfo, AuthenticationResult, PublicClientApplication } from "@azure/msal-browser";

export const msalConfig = {
  auth: {
    clientId: "49e6fa71-9a2c-465e-a3bc-8ba2f15bad61",
    redirectUri: "http://localhost:3000/home",
  },
};

const msalInstance = new PublicClientApplication(msalConfig);

export function getUserAccount(): AccountInfo | null {
  const accounts = msalInstance.getAllAccounts();
  if (accounts.length > 0) {
    return accounts[0];
  }

  return null;
}

export function getUserAccountId(): string {
  const account = getUserAccount();

  if (account) {
    return account.localAccountId;
  }

  return "";
}

export async function getToken(): Promise<AuthenticationResult | null> {
  const account = getUserAccount();
  if (account) {
    // skipcq: JS-0240
    const request = { scopes: ["user.read"], account: account, forceRefresh: false };
    return await msalInstance.acquireTokenSilent(request);
  }
  return null;
}

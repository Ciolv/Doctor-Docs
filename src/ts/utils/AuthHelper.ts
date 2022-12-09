import { AccountInfo, AuthenticationResult, PublicClientApplication } from "@azure/msal-browser";
import {
  OAuthClientId,
  OAuthLogoutRedirectURI,
  OAuthMainWindowRedirectURI,
  OAuthRedirectURI,
  OAuthTenantURI,
} from "./Config";

export const msalConfig = {
  auth: {
    clientId: OAuthClientId,
    authority: OAuthTenantURI,
    redirectUri: OAuthRedirectURI,
  },
};

export const msalInstance = new PublicClientApplication(msalConfig);

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

export async function getTokenResponse(): Promise<AuthenticationResult | null> {
  const account = getUserAccount();
  if (account) {
    // skipcq: JS-0240
    const request = { scopes: ["user.read"], account: account, forceRefresh: false };
    return await msalInstance.acquireTokenSilent(request);
  }
  return null;
}

export async function getIdToken() {
  const account = await getTokenResponse();
  return account?.idToken;
}

export async function signOutClickHandler() {
  const accounts = msalInstance.getAllAccounts();
  const account: AccountInfo = accounts[0];
  const homeAccountId = account.homeAccountId;

  const logoutRequest = {
    account: msalInstance.getAccountByHomeId(homeAccountId),
    postLogoutRedirectUri: OAuthLogoutRedirectURI,
    mainWindowRedirectUri: OAuthMainWindowRedirectURI,
  };
  await msalInstance.logoutPopup(logoutRequest);
}

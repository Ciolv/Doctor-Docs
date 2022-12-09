//import process from "process";

const isCI = process.env.CI === "true";

function getConfigParameter(name: string, optional: boolean, defaultValue = ""): string {
  const parameter = process.env[name];
  if (parameter === undefined) {
    if (!optional) {
      if (parameter === undefined && !isCI) {
        throw new Error(`No '${name}' specified`);
      }
    }

    return defaultValue;
  }

  return parameter;
}

function getNumberConfigParameter(name: string, optional: boolean, defaultValue = 0): number {
  const value = getConfigParameter(name, optional, String(defaultValue));
  const parsed = parseInt(value);
  if (isNaN(parsed)) {
    if (!optional) {
      throw new Error(`No '${name}' specified`);
    }

    return defaultValue;
  }

  return parsed;
}

export const BackendEndpoint = getConfigParameter("REACT_APP_BACKEND_ENDPOINT", false);
export const FrontendPort = getNumberConfigParameter("REACT_APP_FRONTEND_PORT", true, 3000);
export const OAuthRedirectURI = getConfigParameter("REACT_APP_OAUTH_LOGIN_REDIRECT_URI", false, "");
export const OAuthClientId = getConfigParameter("REACT_APP_OAUTH_CLIENT_ID", false, "");
export const OAuthLogoutRedirectURI = getConfigParameter("REACT_APP_OAUTH_LOGOUT_REDIRECT_URI", false, "");
export const OAuthMainWindowRedirectURI = getConfigParameter("REACT_APP_OAUTH_MAIN_WINDOW_REDIRECT_URI", false, "");
export const OAuthTenantURI = getConfigParameter("REACT_APP_OAUTH_TENANT_URI", false);

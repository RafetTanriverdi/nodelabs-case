const AUTH_STORAGE_KEY = "isAuthenticated";

export function checkUserAuthentication(): boolean {
  return localStorage.getItem(AUTH_STORAGE_KEY) === "true";
}

export function setUserAuthenticated(isAuthenticated: boolean): void {
  localStorage.setItem(AUTH_STORAGE_KEY, String(isAuthenticated));
}


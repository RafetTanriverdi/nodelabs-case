const TOKEN_STORAGE_KEY = "accessToken";



export function getToken() {
  return localStorage.getItem(TOKEN_STORAGE_KEY) ?? "";
}

export function setToken(token: string): void {
  localStorage.setItem(TOKEN_STORAGE_KEY, token);
}

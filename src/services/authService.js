// mock async API calls to simulate authentication via Backend

export function login(username, password) {
  const validUsername = import.meta.env.VITE_AUTH_USERNAME;
  const validPassword = import.meta.env.VITE_AUTH_PASSWORD;

  if (username === validUsername && password === validPassword) {
    document.cookie = "auth=true; path=/";

    return new Promise((resolve) => {
      setTimeout(resolve, 500);
    });
  } else {
    // Intentionally providing the credentials
    return Promise.reject(`Invalid credentials. Use '${validUsername}' and '${validPassword}'`);
  }
}

export function checkAuth() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(document.cookie.includes("auth=true"));
    }, 500);
  });
}

export function logout() {
  document.cookie = "auth=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  return new Promise((resolve) => {
    setTimeout(resolve, 500);
  });
}

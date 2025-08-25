// mock async API call
export function login(username, password) {
  const validUsername = import.meta.env.VITE_AUTH_USERNAME;
  const validPassword = import.meta.env.VITE_AUTH_PASSWORD;

  if (username === validUsername && password === validPassword) {
    document.cookie = "isAuthenticated=true; path=/";
    return new Promise((resolve) => {
      setTimeout(resolve, 500);
    });
  } else {
    // Intentionally providing the credentials
    return Promise.reject(`Invalid credentials. Use '${validUsername}' and '${validPassword}'`);
  }
}

// mock async API call
export function checkAuth() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(document.cookie.includes("isAuthenticated=true"));
    }, 500);
  });
}

export function logout() {
  document.cookie = "isAuthenticated=false; path=/";
  return new Promise((resolve) => {
    setTimeout(resolve, 500);
  });
}

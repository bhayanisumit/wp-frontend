export const getToken = () => {
  return localStorage.getItem("token");
};

export const isAuthenticated = () => {
  return !!getToken();
};

export const isAdmin = () => {
  const token = getToken();
  if (!token) return false;

  try {
    const payload = JSON.parse(atob(token.split(".")[1])); // decode JWT
    return payload.role === "admin";
  } catch (err) {
    console.error("Invalid token", err);
    return false;
  }
};

export const logout = () => {
  localStorage.removeItem("token");
};

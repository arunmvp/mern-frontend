import React, { createContext, useState, useEffect } from "react";

// Named export for context
export const AuthContext = createContext();

// Functional component for provider
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    const storedToken = localStorage.getItem("token");
    // console.log(storedUser);
    
    if (storedUser && storedToken) {
      setUser(storedUser);
      setToken(storedToken);
      setIsAuthenticated(true);
    }
  }, []);

  const register = (userdata, token) => {
    const normalizedUser = { ...userdata, _id: userdata.id || userdata._id };
    setUser(normalizedUser);
    setToken(token);
    setIsAuthenticated(!!token);

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(normalizedUser));

    window.location.reload();
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);

    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("cartItems")

    // console.log("User logged out");
    window.location.reload();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

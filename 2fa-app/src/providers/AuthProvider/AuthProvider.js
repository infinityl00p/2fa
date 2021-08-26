import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();
export const AuthSetterContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const authValue = { isLoggedIn };
  const authSetterValue = { setIsLoggedIn };
  const authToken = localStorage.getItem("authToken");

  useEffect(() => {
    if (authToken) {
      axios
        .get("http://localhost:3001/user", {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        })
        .then((response) => {
          setIsLoggedIn(response?.data?.loggedIn || false);
        });
    }
  }, [authToken]);

  return (
    <AuthContext.Provider value={authValue}>
      <AuthSetterContext.Provider value={authSetterValue}>
        {children}
      </AuthSetterContext.Provider>
    </AuthContext.Provider>
  );
};

import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();
export const AuthSetterContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const authValue = { user };
  const authSetterValue = { setUser };
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
          setUser(response.data.loggedIn);
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

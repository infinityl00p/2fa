import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const AuthContext = createContext();
export const AuthSetterContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const authValue = { user };
  const authSetterValue = { setUser };

  useEffect(() => {
    axios.get("http://localhost:3001/user").then((response) => {
      setUser(response.data.loggedIn);
    });
  }, []);

  return (
    <AuthContext.Provider value={authValue}>
      <AuthSetterContext.Provider value={authSetterValue}>
        {children}
      </AuthSetterContext.Provider>
    </AuthContext.Provider>
  );
};

import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";

export const useAuth = () => {
  const { isLoggedIn } = useContext(AuthContext);

  return !!isLoggedIn;
};

import { useContext } from "react";
import { Button } from "../../components/Button";
import { AuthSetterContext } from "../../providers/AuthProvider";
import "./styles.css";

export const Authenticated = () => {
  const { setUser } = useContext(AuthSetterContext);

  const handleClick = () => {
    localStorage.removeItem("authToken");
    setUser(false);
  };

  return (
    <>
      <div>
        <Button type="button" value="Logout" onClick={handleClick} />
      </div>

      <div className="authenticatedText">
        Logged In! Refresh to confirm a session has been created
      </div>
    </>
  );
};

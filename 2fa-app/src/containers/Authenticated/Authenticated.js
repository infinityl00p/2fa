import axios from "axios";
import { useContext, useState } from "react";
import { Button } from "../../components/Button";
import { Error } from "../../components/Error";
import { AuthSetterContext } from "../../providers/AuthProvider";
import "./styles.css";

export const Authenticated = () => {
  const { setUser } = useContext(AuthSetterContext);
  const [error, setError] = useState("");

  const handleClick = () => {
    axios.get("http://localhost:3001/auth/logout").then((response) => {
      if (!response.data.loggedIn) {
        setUser(response.data.loggedIn);
      }
      if (response.data.error || response.data.loggedIn) {
        setError("Unable to Logout");
      }
    });
  };

  return (
    <>
      <div>
        <Button type="button" value="Logout" onClick={handleClick} />
        {error && <Error text={error} />}
      </div>

      <div className="authenticatedText">
        Logged In! Refresh to confirm a session has been created
      </div>
    </>
  );
};

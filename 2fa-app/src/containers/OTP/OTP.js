import { useContext, useState } from "react";
import { LabelInput } from "../../components/LabelInput";
import axios from "axios";
import { useHistory, useLocation } from "react-router-dom";
import { AuthSetterContext } from "../../providers/AuthProvider/AuthProvider";
import { Button } from "../../components/Button";
import { Error } from "../../components/Error";

export const OTP = () => {
  const location = useLocation();
  const [OTP, setOTP] = useState("");
  const [error, setError] = useState("");
  const { setUser } = useContext(AuthSetterContext);
  let history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .get("http://localhost:3001/auth/login/verify", {
        params: {
          phone: location.state.phone,
          OTP,
        },
      })
      .then((response) => {
        if (response.data.isValid) {
          setUser(true);
          history.push("/");
        }
        if (!response.data.isValid || response.data.error) {
          setError("Invalid Pin, try again");
        }
      });
  };

  const onOTPChange = (e) => {
    e.preventDefault();
    setOTP(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <LabelInput
        text={"Enter the one time password sent to phone #:"}
        type={"text"}
        name={"OTP"}
        value={OTP}
        onChange={onOTPChange}
      />
      <Button type="submit" value="Submit" />
      {error && <Error text={error} />}
    </form>
  );
};

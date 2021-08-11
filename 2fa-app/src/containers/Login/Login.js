import { useState } from "react";
import { useHistory } from "react-router-dom";
import { LabelInput } from "../../components/LabelInput";
import axios from "axios";
import { Button } from "../../components/Button";
import { Error } from "../../components/Error";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  let history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();

    // validate on the server
    axios
      .post("http://localhost:3001/auth/login", {
        email,
        password,
      })
      .then((response) => {
        if (response.status === 200 && response?.data?.phone) {
          history.push("/login/otp", { phone: response.data.phone });
        }

        if (response.data.error) {
          setError("Unable To Login");
        }
      });
  };

  const onEmailChange = (e) => {
    e.preventDefault();

    setEmail(e.target.value);
  };

  const onPasswordChange = (e) => {
    e.preventDefault();

    setPassword(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <LabelInput
        text={"Email:"}
        type={"text"}
        name={"email"}
        value={email}
        onChange={onEmailChange}
      />
      <LabelInput
        text={"Password:"}
        type={"password"}
        name={"password"}
        value={password}
        onChange={onPasswordChange}
      />
      <Button type="submit" value="Login" />
      {error && <Error text={error} />}
    </form>
  );
};

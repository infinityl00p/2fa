import axios from "axios";
import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "../../components/Button";
import { Error } from "../../components/Error";
import { LabelInput } from "../../components/LabelInput";
import { AuthSetterContext } from "../../providers/AuthProvider";

export const Create = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  let history = useHistory();
  const { setUser } = useContext(AuthSetterContext);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (confirmPassword !== password) {
      alert("passwords do not match!");
    }

    if (
      email === "" ||
      password === "" ||
      phone === "" ||
      confirmPassword === ""
    ) {
      alert("Please enter all fields");
    }

    // validate on the server
    axios
      .post("http://localhost:3001/auth/create", {
        email,
        password,
        phone,
      })
      .then((response) => {
        console.log(
          "🚀 ~ file: Create.js ~ line 42 ~ .then ~ response",
          response
        );

        if (response.data.loggedIn) {
          setUser(response.data.loggedIn);
          history.push("/");
        }

        if (response.error) {
          setError("Unable To Create User");
        }
      });
  };

  const onEmailChange = (e) => {
    e.preventDefault();

    setEmail(e.target.value);
  };

  const onPhoneChange = (e) => {
    e.preventDefault();

    setPhone(e.target.value);
  };

  const onPasswordChange = (e) => {
    e.preventDefault();

    setPassword(e.target.value);
  };

  const onConfirmPasswordChange = (e) => {
    e.preventDefault();

    setConfirmPassword(e.target.value);
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
        text={"Phone:"}
        type={"phone"}
        name={"phone"}
        value={phone}
        onChange={onPhoneChange}
      />
      <LabelInput
        text={"Password:"}
        type={"password"}
        name={"password"}
        value={password}
        onChange={onPasswordChange}
      />
      <LabelInput
        text={"Confirm Password:"}
        type={"password"}
        name={"confirm"}
        value={confirmPassword}
        onChange={onConfirmPasswordChange}
      />
      <Button type="submit" value="Create" />
      {error && <Error text={error} />}
    </form>
  );
};

import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth/useAuth";
import { Authenticated } from "../Authenticated";
import { Create } from "../Create";
import { Login } from "../Login";
import { Navigation } from "../Navigation";
import { OTP } from "../OTP";
import "./styles.css";

const Router = () => {
  const isLoggedIn = useAuth();

  return (
    <BrowserRouter>
      {!isLoggedIn && <Navigation />}
      <div className="appWrapper">
        <Switch>
          <Route
            path="/login/otp"
            render={() => (!!isLoggedIn ? <Authenticated /> : <OTP />)}
          />
          <Route
            path="/login"
            render={() => (!!isLoggedIn ? <Authenticated /> : <Login />)}
          />
          <Route path="/create">
            <Create />
          </Route>
          <Route
            path="/"
            render={() =>
              !!isLoggedIn ? (
                <Authenticated />
              ) : (
                <Redirect
                  to={{
                    pathname: "/login",
                  }}
                />
              )
            }
          />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export const App = () => <Router />;

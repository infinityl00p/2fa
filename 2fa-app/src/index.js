import React from "react";
import ReactDOM from "react-dom";
import { App } from "./containers/App";
import { AuthProvider } from "./providers/AuthProvider";
import axios from "axios";

axios.defaults.withCredentials = true;

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

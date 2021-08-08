const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const session = require("express-session");
const cors = require("cors");
require("./db").dbConnect();
const logout = require("./handlers/logout");
const login = require("./handlers/login");
const verify = require("./handlers/verify");
const create = require("./handlers/create");
const user = require("./handlers/user");
require("dotenv").config();
const PORT = 3001;

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    exposedHeaders: ["set-cookie"],
  })
);
app.use(bodyParser.json());
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      expires: 86400 * 7,
      httpOnly: true,
    },
  })
);

app.get("/auth/logout", logout.handler);
app.post("/auth/login", login.handler);
app.get("/auth/login/verify", verify.handler);
app.post("/auth/create", create.handler);
app.get("/user", user.handler);

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});

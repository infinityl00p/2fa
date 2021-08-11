const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const session = require("express-session");
const cors = require("cors");
require("./db").dbConnect();
const authRouter = require("./routers/auth");
const error = require("./handlers/error");
const user = require("./handlers/user");
require("dotenv").config();
const PORT = 3001;
const CORS_ORIGIN = "http://localhost:3000";
const SESSION_SECRET = "secret";

app.use(
  cors({
    origin: CORS_ORIGIN,
    credentials: true,
    exposedHeaders: ["set-cookie"],
  })
);
app.use(bodyParser.json());
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      expires: 86400 * 7,
      httpOnly: true,
    },
  })
);

app.use("/auth", authRouter);
app.get("/user", user.handler);
app.use(error.handler);

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});

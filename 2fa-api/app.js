const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
require("./db").dbConnect();
const authRouter = require("./routers/auth");
const error = require("./handlers/error");
const user = require("./handlers/user");
require("dotenv").config();
const PORT = 3001;
const CORS_ORIGIN = "http://localhost:3000";

app.use(
  cors({
    origin: CORS_ORIGIN,
    credentials: true,
    exposedHeaders: ["set-cookie"],
  })
);
app.use(bodyParser.json());

app.use("/auth", authRouter);
app.get("/user", user.handler);
app.use(error.handler);

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});

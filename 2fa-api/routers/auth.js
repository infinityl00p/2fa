const auth = require("express").Router();
const logout = require("../handlers/logout");
const login = require("../handlers/login");
const verify = require("../handlers/verify");
const create = require("../handlers/create");

auth.get("/logout", logout.handler);
auth.get("/login/verify", verify.handler);
auth.post("/login", login.handler);
auth.post("/create", create.handler);

module.exports = auth;

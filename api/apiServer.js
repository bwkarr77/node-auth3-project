const express = require("express");
const router = require("express").Router();
console.log("server.js...");

// const apiRouter = require("../routers/routers.jsx");
const authRouter = require("../auth/authRouter.jsx");
const restrictedRouter = require("../restricted/restrictedRouter.jsx");
const apiRouter = require("./apiRouter");
const configureMiddleware = require("./configureMiddleware.js");

const server = express();
configureMiddleware(server);

server.use("/api", apiRouter);
server.use("/api/auth", authRouter);
server.use("/api/restricted", restrictedRouter);

server.get("/", (req, res) => {
  res.json({ message: "API Working!!!!!\n" });
});
module.exports = server;

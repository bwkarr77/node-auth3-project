//from instruction

const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
//cookies section....
const session = require("express-session");
const knexSessionStore = require("connect-session-knex")(session);

const sessionOptions = {
  name: "cookieName",
  secret: "enterSomethingCleverHere",
  cookies: {
    maxAge: 1000 * 60 * 60,
    secure: false,
    httpOnly: true
  },
  resave: false,
  saveUninitialized: false,

  store: new knexSessionStore({
    knex: require("../utils/db-config.js"),
    tablename: "sessions",
    sidfieldname: "sid",
    createtable: true,
    clearInterval: 1000 * 60 * 60
  })
};

const logger = (req, res, next) => {
  console.log("logger running....\n");
  console.log(`${req.method} - ${req.url} - ${Date(Date.now())}`);
  next();
};

module.exports = server => {
  server.use(logger);
  server.use(helmet());
  server.use(cors());
  server.use(express.json());
  server.use(session(sessionOptions));
};

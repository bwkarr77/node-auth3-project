//from instruction

const users = require("../utils/userDb-model.js");
const bcrypt = require("bcryptjs");
const { jwtSecrets } = require("../utils/secrets.js");
const jwt = require("jsonwebtoken");

exports.authorize = (req, res, next) => {
  const { username, password } = req.body;
  // const { username, password } = req.headers;
  console.log("authorize:", username, password);
  // validate that they exist ... we didn't have this part in class...
  if (!(username && password)) {
    res.status(401).json({ message: "invalid Inputs" });
  } else {
    users
      .findBy({ username })
      .first()
      .then(user => {
        //Should be a true value, but won't return true :(
        let boolRet = bcrypt.compareSync(password, user.password);
        //
        console.log("authRequiredMiddle.then: ", password, user, boolRet);
        //
        if (user && boolRet) {
          req.session.user = user;
          req.session.loggedin = true;
          next();
        } else {
          res.status(401).json({ message: "Invalid Credentials" });
        }
      })
      .catch(err => {
        res.status(500).json({ Errmessage: `${err}` });
      });
  }
};

exports.restricted = (req, res, next) => {
  console.log("restricted");
  /*
  if (req.session.loggedin && req.session.loggedin === true) {
    next();
  } else {
    console.log("restriced validation failed", req.session);
    res
      .status(400) //error
      .json({ errMessage: "Not logged in" });
  }
  */

  const token = req.headers.authorization;
  if (token) {
    console.log("restricted: token exists:\n", token, jwtSecrets);
    jwt.verify(token, jwtSecrets, (err, decodedToken) => {
      if (err) {
        console.log("restricted: jwt.verify error:\n", err, decodedToken);
        res
          .status(401)
          .json({ message: "authorization failed. Token is different" });
      } else {
        console.log("restricted: jwt.verify no error");
        if (req.params.id) {
          if (decodedToken.subject == req.params.id) {
            next();
          } else {
            res.status(401).json({ message: "You do not have access" });
          }
        } else {
          next();
        }
      }
    });
  }
};

exports.veryNewUser = (req, res, next) => {
  const { username, password } = req.body;
  if (username && password) {
    users.findBy(username).then(user => {
      if (user) {
        res
          .status(400) //error
          .json({ message: "username already exists" });
      } else {
        next();
      }
    });
  } else {
    res
      .status(400) //error
      .json({ message: "username and password fields required" });
  }
};

//from instruction

const users = require("../utils/userDb-model.js");
const bcrypt = require("bcryptjs");

exports.authorize = (req, res, next) => {
  const { username, password } = req.body;
  // const { username, password } = req.headers;
  console.log("authorize:", username, password);
  // validate that they exist ... we didn't have this part in class...
  if (!(username && password)) {
    res.status(401).json({ message: "invalid Inputs" });
  } else {
    users
      .findByCredentials({ username })
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
          console.log("authRequiredMiddleware Success!!!", req.session);
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
  if (req.session.loggedin && req.session.loggedin === true) {
    next();
  } else {
    console.log("restriced validation failed", req.session);
    res
      .status(400) //error
      .json({ errMessage: "Not logged in" });
  }
};

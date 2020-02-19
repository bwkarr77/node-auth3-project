console.log("userControllers");

const jwt = require("jsonwebtoken");
const Users = require("../utils/userDb-model.js");
const secrets = require("../utils/secrets.js");

const generateToken = user => {
  //====1st way of writing it....=====
  const payload = {
    //list of "claims"; aka permissions for user
    subject: user.id,
    username: user.username,
    department: user.department //remove or keep???
  };
  const options = {
    expiresIn: "1h"
  };
  console.log("generateToken: \n", payload, secrets.jwtSecret, options);
  return jwt.sign(payload, secrets.jwtSecret, options);

  //=========
  /* ===2nd way to write it....===
  return jwt.sign(
    {
      subject: user.id,
      username: user.username,
      department: user.department
    },
    secrets.jwtSecret,
    { expiresIn: "1h" }
  );
  */
};

// ================================
//            POST
// ================================
// @desc    POST/CREATE new user
// @route   POST to /api/auth/register
exports.createUser = (req, res, next) => {
  let user = req.body;
  console.log("userController.createUser", user);

  Users.add(user)
    .then(newUser => {
      console.log("createUser.step1");
      const newUserToken = generateToken(newUser);
      console.log("createUser.step2");

      res
        .status(201) //success
        .json({
          SuccessMessage: `${newUser.username}`,
          token: `${newUserToken}`
        });
    })
    .catch(err => {
      res
        .status(500) //error
        .json({ errMessage: `createUser error: ${err}` });
    });
};

// ================================
//            POST
// ================================
// @desc    login with credentials in header
// @route   POST to /api/auth/login
exports.userLogin = (req, res, next) => {
  const loginUserToken = generateToken(req.body);
  let { user, loggedin } = req.session;
  console.log(
    "userControllers>userLogin:",
    user,
    loggedin,
    "\nloginUserToken:",
    loginUserToken
  );
  res.status(200).json({
    message: `Login success ${user.username}!!!`,
    token: `${loginUserToken}`
  });
};

// ================================
//            GET
// ================================
// @desc    GET to obtain all users
// @route   GET to /api/users
exports.getAllUsers = (req, res, next) => {
  const loggedInUser = req.session.user;
  console.log("userController.getAllUsers:", req.session);
  Users.find()
    .orderBy("id")
    // .where(loggedInUser.department)
    .then(users => {
      res
        .status(200) //success
        .json(users);
    })
    .catch(err => {
      res
        .status(500) //server error
        .json({ errMessage: `${err}` });
      // next(err);
    });
};

// ================================
//            DELETE
// ================================
// @desc    DELETE to logout current user (since we are destroying req.session)
// @route   DELETE to /api/logout
exports.logout = (req, res, next) => {
  console.log("logout>pre", req.session);
  if (req.session) {
    req.session.destroy(err => {
      if (err) {
        res
          .send(401) //error
          .json({ errMessage: "errors for days!" });
      } else {
        res
          .status(202) //success (?)
          .json({ message: "successful logout" });
        console.log("logout>post:", req.session);
      }
    });
  } else {
    res.end();
  }
};

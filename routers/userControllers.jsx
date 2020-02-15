console.log("userControllers");

const Users = require("../utils/userDb-model.js");

// ================================
//            POST
// ================================
// @desc    POST/CREATE new user
// @route   POST to /api/auth/register
exports.createUser = (req, res, next) => {
  console.log("userController.createUser");
  let user = req.body;

  Users.add(user)
    .then(newUser => {
      res
        .status(201) //success
        .json(newUser);
    })
    .catch(err => {
      res
        .status(500) //error
        .json({ errMessage: `${err}` });
    });
};

// ================================
//            POST
// ================================
// @desc    login with credentials in header
// @route   POST to /api/auth/login
exports.userLogin = (req, res, next) => {
  let { user, loggedin } = req.session;
  console.log("userControllers>userLogin:", user, loggedin);
  res.status(200).json({ message: `Login success ${user.username}!!!` });
};

// ================================
//            GET
// ================================
// @desc    GET to obtain all users
// @route   GET to /api/users
exports.getAllUsers = (req, res, next) => {
  console.log("userController.getAllUsers:", req.session);
  Users.find()
    .orderBy("id")
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

const router = require("express").Router();
console.log("authRouter.jsx starting....\n");
const { authorize } = require("../auth/authRequiredMiddleware.jsx");

//import controller functions
const { createUser, userLogin } = require("../routers/userControllers.jsx");

//register new user
router.route("/register").post(createUser);
//login with username/password in the body
router.route("/login").post(authorize, userLogin);

module.exports = router;

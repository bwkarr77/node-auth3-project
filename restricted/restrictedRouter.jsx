const router = require("express").Router();
console.log("restrictedRouter.jsx running....\n");
const { restricted } = require("../auth/authRequiredMiddleware.jsx");

//import controller functions
const { getAllUsers, logout } = require("../routers/userControllers.jsx");

//get all users IF successful login
router.route("/users").get(restricted, getAllUsers);
//logout function
router.route("/logout").delete(logout);

module.exports = router;

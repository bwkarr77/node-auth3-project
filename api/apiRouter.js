//from instruction
console.log("apiRouter running....\n");
const router = require("express").Router();

const { logout } = require("../routers/userControllers.jsx");

router.get("/", (req, res) => {
  res.json({
    message:
      'Use "/api/auth" for creating a new user or loggin in.  Use "/api/restricted to get information after you have signed in.'
  });
});
router.route("/logout").delete(logout);

module.exports = router;

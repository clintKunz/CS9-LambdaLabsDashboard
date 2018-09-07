const express = require("express");
const router = express.Router();
const passport = require("passport");
const { makeToken } = require("../MiddleWare/jwtMiddleWare.js");
const passportSetup = require("./twitterPassport.js");

router.get("/", passport.authenticate("twitter"), (req, res) => {
  // const token = makeToken(req.user);
  // console.log("token", token);
  // const options = {
  //   headers: {
  //     authorization: `token ${token}`
  //   }
  // };
  console.log("hello");
  res.redirect("localhost:3000/projects");
});

module.exports = router;

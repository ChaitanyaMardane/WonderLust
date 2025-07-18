const express= require("express");
const router= express.Router();
const User=require('../models/user');
const passport=require('passport');
const user = require("../controller/user")

const wrapAsync = require("../utils/wrapAsync");
const {saveRedirectUrl}=require("../middleware")


//get new User Route
router.route("/signup")
    .get(user.signupUser)
    .post(wrapAsync(user.registerUser));

//get login User Route
router.route("/login")
    .get(user.getUserLogin)
    .post(saveRedirectUrl, passport.authenticate('local', {
        failureRedirect: "/login",
        failureFlash: true,
    }), user.loginUser);

//logout
router.get("/logout",user.logoutUser)


module.exports=router;
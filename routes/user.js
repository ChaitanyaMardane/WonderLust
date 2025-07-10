const express= require("express");
const router= express.Router();
const User=require('../models/user');
const passport=require('passport');

const wrapAsync = require("../utils/wrapAsync");
const {saveRedirectUrl}=require("../middleware")


//get new User Route
router.get("/signup", (req,res)=>{
    res.render("User/signup.ejs");
});

//Post new USer Route
router.post("/signup", wrapAsync(async (req, res, next) => {
    try {
        let { username, email, password } = req.body;
        let newUser = new User({ username, email });
        let registeredUser = await User.register(newUser, password);
        req.login(registeredUser, (err) => {
            if (err) return next(err);
           
            req.flash("success", "Welcome to WonderLust");
            return res.redirect("/listing");
        });
    } catch (error) {
        let msg = error.message;
        req.flash("error", `${msg}`);
        return res.redirect("/signup");
    }
}))

//get login User Route
router.get("/login", (req,res)=>{
    res.render("User/login.ejs");
});
router.post('/login',saveRedirectUrl,
    passport.authenticate('local',
    {
        failureRedirect:"/login",
        failureFlash : true,
    }
),async (req ,res)=>{
    req.flash("success","Welcome back to WonderLust")
    console.log(res.locals.redirectedUrl );
    let redirectedUrl=res.locals.redirectedUrl || "/listing";
    res.redirect(redirectedUrl);
})

//logout
router.get("/logout", (req,res)=>{
    
    req.logOut((err)=>{
        if(err){
           next(err);
        }
        {  req.flash("success",`User logged out `)}
        res.redirect("/listing")
    })
})


module.exports=router;
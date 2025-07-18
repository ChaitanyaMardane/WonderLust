const User=require('../models/user');

module.exports.signupUser= (req,res)=>{
    res.render("User/signup.ejs");
}

module.exports.registerUser= async (req, res, next) => {
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
}

module.exports.getUserLogin= (req,res)=>{
    res.render("User/login.ejs");
}

module.exports.loginUser= async (req ,res)=>{
    req.flash("success","Welcome back to WonderLust")
    console.log(res.locals.redirectedUrl );
    let redirectedUrl=res.locals.redirectedUrl || "/listing";
    res.redirect(redirectedUrl);
}

module.exports.logoutUser= (req,res)=>{
    req.logOut((err)=>{
        if(err){
           next(err);
        }
        {  req.flash("success",`User logged out `)}
        res.redirect("/listing")
    })
}
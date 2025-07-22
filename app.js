require('dotenv').config();
const express= require("express");7

const ejsMate=require("ejs-mate");
const { default: mongoose } = require("mongoose");
const app=express();
const path=require("path");
const flash=require("connect-flash");

const methodOverride=require("method-override");

const listing=require("./routes/listing.js");
const review=require("./routes/review.js");
const user=require("./routes/user.js");
const session =require("express-session");
const MongoStore = require('connect-mongo');
const ExpressError = require('./ExpressErrors/ExpressErrors.js');
const User=require("./models/user.js");
const passport =require("passport");
const LocalStrategy=require("passport-local");



app.use(methodOverride("_method"));
const db_URL=process.env.ATLAS_URI ;
app.set("views", path.join(__dirname,"views"));
app.set("view engine","ejs");
app.use(express.urlencoded({extended : true}));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"public")));


async function  main(){
    await mongoose.connect(db_URL)
}
main().then(()=>{
    console.log("connect to DB")
})
.catch((err)=>{
    console.log(err);
    
});
const store = MongoStore.create({
    mongoUrl: db_URL,
    touchAfter: 24 * 3600, // time period in seconds
    crypto: {
        secret:process.env.SECRET,
    }
});
store.on("error",  ()=> {
    console.log("Error in session store: "+error);
});

 const sessionOptions={
    store,
    secret:process.env.SECRET,
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires:Date.now()+1000*60*60*24,
        maxAge:1000*60*60*24,
        httpOnly:true,
    }
 }
 app.use(session(sessionOptions));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use((req,res,next)=>{
    res.locals.success=req.flash("success");
    res.locals.failure=req.flash("error");
    res.locals.currUser = req.user;

   console.log(req.user + " hello");
   
    

    next();
})

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())


app.use("https://wonderlust-chaitanya.onrender.com/",(req,res)=>{
    res.render("Listing/index.ejs");
})
app.use("/listing",listing)
app.use("/listing/:id/review",review)
app.use("/",user);



app.all("*",(req,res,next)=>{
    next(new ExpressError(404,'Page Not Found'))
})
app.use((err,req,res,next)=>{
    let {statuscode=500,message="Something Went Wrong"}=err;
    console.log(err.stack);
    
    res.status(statuscode).render("Listing/error.ejs",{err});

})
 





app.listen(8080,()=>{
    console.log("app is listening at http://localhost:8080/listing/");
     

})


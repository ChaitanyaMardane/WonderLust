const { default: mongoose } = require("mongoose");
let data = require("./data.js");
// console.log(data);
const MONGO_URL="mongodb://localhost:27017/wonderlust"
const Listing=require("../models/listing.js");
main().then(()=>{
    console.log("connect to DB")
})
.catch((err)=>{
    console.log(err);
    
});
async function  main(){
    await mongoose.connect(MONGO_URL)
}
 async function initDB(){
    await Listing.deleteMany({});
    console.log("Deleted all existing listings");
   data = data.map(listing => ({
        ...listing,
        owner: "68555a70c5cfce6e039a08ba"
    }));
    await Listing.insertMany(data);   
   
    console.log("Listing saved to database");
    // data.data={name:"Chaitanya"}
    console.log(data);
    
   
 }
initDB().then(()=>{
    console.log("Data inserted successfully")})
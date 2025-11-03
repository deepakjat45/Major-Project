
//require things
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");


//mongoose code
let MONGO_URL = "mongodb://127.0.0.1:27017/Airbnb";

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}





//set 
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, "/public")));



//index Route, for all listings
app.get("/listings", async (req, res)=>{
  const allListings = await Listing.find({})
  res.render("listings/index.ejs", {allListings});
});


//new route, to give form
app.get("/listings/new", (req, res)=>{
  res.render("listings/new.ejs");
}); 

//show Route, show specific listing  
app.get("/listings/:id", async (req, res)=>{
  let {id} = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/show.ejs", {listing});
});

//create route, to create new listing (by button) 
app.post("/listings", async (req, res)=>{
  // let {tital, description, image, price, location, country} = req.body;
  //or 
  // let listing = req.body.listing;
  const newListing = new Listing(req.body.listing);
  await newListing.save();
  res.redirect("/listings");
});

//edit route, edit listing in form
app.get("/listings/:id/edit", async (req, res)=>{
  let {id} = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/edit.ejs", {listing});
});

//Update Route, update in DB
app.put("/listings/:id", async (req, res)=>{
  let {id} = req.params;
  await Listing.findByIdAndUpdate(id, {...req.body.listing});
  res.redirect(`/listings/${id}`);
});

//Delete Route, to delete listing 
app.delete("/listings/:id", async (req, res)=>{
  let {id} = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  console.log(deletedListing);
  res.redirect("/listings");
});

// app.get("/testListing", async (req, res) => {
//   let sampleListing = new Listing({
//     title: "villa",
//     description: "near beach",
//     price: 1200,
//     location: "surat",
//     country: "india",
//   });
//   await sampleListing.save();
//   console.log('smmaple was saved ');
//   res.send("success");
// });


app.get("/", (req, res) => {
  res.send("this is home route");
});

app.listen(8080, (req, res) => {
  console.log("port is listling on port 8080");
});

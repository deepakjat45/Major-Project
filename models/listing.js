const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    filename: String,
    url: {
      type: String,
      default:
        "https://media.istockphoto.com/id/2216161828/vector/placeholder-image-with-mountain-scenery-useful-for-website-design-app-development-or.jpg?s=2048x2048&w=is&k=20&c=qqrR9xH6UVy3YcBpKuaK_q8lLHOWRlJexm-P9XDn2hw=",
    },
  },
  price: Number,
  location: String,
  country: String,
});



const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;

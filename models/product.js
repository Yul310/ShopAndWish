const mongoose = require("./connection");
// pull schema and model from mongoose
const { Schema, model } = mongoose;

// make Review schema
const reviewSchema = new Schema({
  content:String
 ,
  rating: {type: Number, min: 1, max: 5, default: 2.5}
}, {
  timestamps: true
});


// make Product schema
const productSchema = new Schema({

  title: {
    type: String,
    required: true
  },
  description: String,
  image: String,
  rating: {
    type: Number,
    default: 0
  },
  ratings_total: {
    type: Number,
    default: 0
  },
  price: {
    type: Number,
    min: 0,
    default: 10
  },
  category: {
    type: String
  },
  reviews: [reviewSchema]

  // rating:{
  //     rate:Number,
  //     count:Number
  // }


});

// make Vampire model
const Product = model("Product", productSchema);

///////////////////////////////////////////////////
// Export Model
///////////////////////////////////////////////////
module.exports = Product;

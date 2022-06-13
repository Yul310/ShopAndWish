const mongoose = require("./connection");
// pull schema and model from mongoose
const { Schema, model } = mongoose;

// make vampire schema
const productSchema = new Schema({
  title: {
      type:String,
    //   required:true
  },
  description: String,
  image: String,
  price: {
    type:Number,
    min:0
  },
  category:{
    type:String
  },
  rating:{
      rate:Number,
      count:Number
  }
 
});

// make Vampire model
const Product = model("Product", productSchema);

///////////////////////////////////////////////////
// Export Model
///////////////////////////////////////////////////
module.exports = Product;

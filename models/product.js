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
    min:0,
    default:10
  },
  category:{
    type:String
  },
  // rating:{
  //     rate:Number,
  //     count:Number
  // }
  rating:{Number,  
  },
  rating_total:{Number   
  }
 
});

// make Vampire model
const Product = model("Product", productSchema);

///////////////////////////////////////////////////
// Export Model
///////////////////////////////////////////////////
module.exports = Product;

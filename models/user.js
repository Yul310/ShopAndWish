//////////////////////////////////////////////
// Import Dependencies
//////////////////////////////////////////////
const mongoose = require("./connection");

////////////////////////////////////////////////
// Define Model
////////////////////////////////////////////////
// pull schema and model from mongoose
const { Schema, model } = mongoose;


const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  cart: [ { type: Schema.Types.ObjectId,
    ref: 'Product'}],
  wishList: {type:Array},
  loggedIn: {type:Boolean, default:false}
});


const User = mongoose.model("User", userSchema);

///////////////////////////////////////////////////
// Export Model
///////////////////////////////////////////////////
module.exports = User;
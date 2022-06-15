
//////////////////////////////////////////
///Shopping cart class
/////////////////////////////////////////
const mongoose = require("./connection");

// pull schema and model from mongoose
const { Schema, model } = mongoose;
const Product = require('./product');

// make Review schema
const cartSchema = new Schema({
 totalPrice: Number,
 totalQty: Number,
 products: [
  { type: Schema.Types.ObjectId,
    ref: 'Product'}
 ]

}, {
  timestamps: true
});


const Cart = model("Cart", cartSchema);

///////////////////////////////////////////////////
// Export Model
///////////////////////////////////////////////////
module.exports = Cart;












// module.exports = function Cart(oldCart) {
//     this.items = oldCart.items ||{};
//     this.totalQty = oldCart.totalQty || 0;
//     this.totalPrice = oldCart.totalPrice || 0;




//     this.add = function(item, id){
//         let storedItem = this.items[id]
//         if (!storedItem){
//             storedItem = this.items[id] = {item:item, qty: 0, price: 0};
//         }
//         storedItem.qty++;
//         storedItem.price = storedItem.item.price*storedItem.qty;
//         this.totalQty++
//         this.totalPrice += storedItem.item.price
//     }

//         this.generateArray = function(){
//             let arr = [];
//             for(let id in this.items){
//                 arr.push(this.items[id])
//             }
//          return arr;
//         }

// }
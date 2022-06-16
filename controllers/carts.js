////////////////////////////////////////
// Import Dependencies
////////////////////////////////////////
const express = require("express"); // import express
const Product = require('../models/product');

const Cart = require('../models/cart');


/////////////////////////////////////////
// Routes
/////////////////////////////////////////
const router = express.Router();




//////////////////////////////////////////////
// Cart Route
//////////////////////////////////////////////
router.get("/username/cart",(req,res)=>{
req.send("hi")

})



// router.post("/products/:product.id/:user.id:/cart", (req, res) => {
//     const id = req.params.id;
//     const uid = req.params.user.id
//     console.log(uid)
//     console.log("post")
//     if (Cart.findOne({}) == null) {
//        Cart.create({
//         userId :uid,
//         products:id
//        })
//        order
//        .save()
//        .exec()
//        .then(result => {
//         console.log(result)
//         res.send("added")
//     })
//     .catch(err => {
//         console.log(err)
//         res.send("error")
//     })
// }

    // Cart.find({})
    //     .populate('products').exec(function (err, cart) {
    //         console.log(cart)
    //         // Performer.find({}).where('_id').nin(movie.cast) <-- Mongoose query builder
    //         // Native MongoDB approach 
    //         Product.find(
    //             { id },
    //             function (err, products) {
    //                 console.log(products);
    //                 res.render(
    //                     'cart', {
    //                     products
    //                 }
    //                 );
    //             }
    //         );
    //     });
// })









//////////////////////////////////////////
// Export the Router
//////////////////////////////////////////
module.exports = router;
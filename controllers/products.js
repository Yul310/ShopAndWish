////////////////////////////////////////
// Import Dependencies
////////////////////////////////////////
const express = require("express"); // import express
const Product = require('../models/product');
const mongoose = require("mongoose")
// const Cart = require('../models/cart');
const User = require("../models/user");
const { Session } = require("express-session");


/////////////////////////////////////////
// Routes
/////////////////////////////////////////
const router = express.Router();

////////////////////////////////////////
// Router Middleware
////////////////////////////////////////
// Authorization Middleware
//-----I decided not to use this middleware so that users can see the products without logging in------//
// router.use((req, res, next) => {
//   if (req.session.loggedIn) {
//     next();
//   } else {
//     res.redirect("/users/login")   
//   }
// });


//////////////////////////////////////////////
// Index Route
//////////////////////////////////////////////
router.get("/", (req, res) => {
  console.log("working")
  const logged =req.session.loggedIn;
  Product.find({})
    .then((products) => {
      res.render("index", { products,logged });
      // console.log(products)
    })
    .catch((error) => {
      res.json({ error });
    });
});


//////////////////////////////////////////////
// Show Route
//////////////////////////////////////////////
router.get("/:id", (req, res) => {
  const id = req.params.id;
  const logged =req.session.loggedIn;

  Product.findById(id)  
    .then((product) => {
      res.render("show", { product,logged});
    
    })
    // .catch((error) => {
    //   res.json({ error });
    // });
});

//////////////////////////////////////////////
// Cart Route - post - push an item to the cart
//////////////////////////////////////////////


  router.post("/:id/cart",(req, res) => {
    console.log("added")
  const productId = req.params.id;
  const uId = req.session.userId;
  // console.log(productId)
  // console.log(uId)
  User.findOne({username:req.session.username},
    function(err, user) {
    
    user.cart.push(productId)
    user.save()
    console.log(user);
    // res.redirect("/products/:id/cartpage")
  })
  // .then((product) => {
   
  //   res.redirect("/products/:id/cartpage")
    
  // })
  .catch((error) => {
    // send error as json
    console.log(error);
    // res.json({ error });
  });
  
  })


//////////////////////////////////////////////
// Cart Route - get - push an item to the cart
//////////////////////////////////////////////


router.get("/:id/cartpage",(req,res)=>{

  // const productId = req.params.id;
console.log(User.findOne({username:req.session.username}))
  User.findOne({username:req.session.username}).populate('cart')
  .exec(function (err, user) {
    console.log(user.cart)
    // Product.find({_id: {$in: user.cart}})
    Product.find({_id: {$in: user.cart}} )
    .then((products) => {
      // console.log(products)
    res.render("cart", { products});
    // console.log(user)
    })
  })
  })



//////////////////////////////////////////////
// Cart Route - delete- push an item to the cart
//////////////////////////////////////////////
router.delete("/:product._id/cart", (req, res) => {
  // get the id from params
  const id = req.params.id;
  console.log("ji")
//   User.findOne({username:req.session.username})
  
//   .then((user) => {
//     console.log(user)
//     user.cart.deleteOne({_id:id})
    
 
//     user.save(err => {
//      if (err) {
//        console.log(err);
//      }
//    })
 
//   })

//   .then((product) => {
//    // redirect to main page after updating
//    res.redirect(`/products/${req.params.id}`)
//    // res.redirect("/products/62a7e10c43da5dc9301bc1fb");
//  })
//  // send error as json
//  .catch((error) => {
//    console.log(error);
//    res.json({ error });
//  });
 
 
 });




//////////////////////////////////////////
// Export the Router
//////////////////////////////////////////
module.exports = router;
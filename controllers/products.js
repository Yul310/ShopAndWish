////////////////////////////////////////
// Import Dependencies
////////////////////////////////////////
const express = require("express"); // import express
const Product = require('../models/product');
const mongoose = require("mongoose")
const Cart = require('../models/cart');
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
// Cart Route
//////////////////////////////////////////////

// router.get("/:id/cart", (req,res) => {
//   const Id = req.params.id;
// 
// })





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
  .catch((error) => {
    // send error as json
    console.log(error);
    // res.json({ error });
  });
  
  })



router.get("/cartpage/:id",(req,res)=>{

  const productId = req.params.id;
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


//////////////////////////////////////////
// Export the Router
//////////////////////////////////////////
module.exports = router;
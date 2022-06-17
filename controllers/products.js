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
// Cart Route - get - push an item to the cart
//////////////////////////////////////////////


router.get("/cartpage", (req, res) => {
  const username = req.session.username
  // const productId = req.params.id;
  const logged = req.session.loggedIn;
  User.findOne({ username: req.session.username }).populate('cart')
    .then((user) => {
      // Product.find({_id: {$in: user.cart}})
      Product.find({ _id: { $in: user.cart } })
        .then((products) => {
          console.log(user)
          qty = user.cart.length
          res.render("cart", { products, user, logged, username, qty })

        })
    })
})


//////////////////////////////////////////////
// Index Route
//////////////////////////////////////////////
router.get("/", (req, res) => {
  console.log("working")
  const username = req.session.username
  const logged = req.session.loggedIn;
 
  Product.find({})
    .then((products) => {

      res.render("index", { products, logged, username });
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
  const logged = req.session.loggedIn;

  Product.findById(id)
    .then((product) => {
      // const user = User.findOne({ username: req.session.username })
      // const qty = user.cart.length
      res.render("show", { product, logged });

    })
  // .catch((error) => {
  //   res.json({ error });
  // });
});

//////////////////////////////////////////////
// Cart Route - post - push an item to the cart
//////////////////////////////////////////////


router.post("/:id/cart", (req, res) => {
  console.log("added")
  const productId = req.params.id;
  const uId = req.session.userId;
  // console.log(productId)
  // console.log(uId)
  User.findOne({ username: req.session.username },
    function (err, user) {
      user.cart.push(productId)
      user.save()
      console.log(user);
      res.redirect("/products/cartpage")
    })
    // .then((product) => {

    //   res.redirect("/products/cartpage")

    // })
    .catch((error) => {
      // send error as json
      console.log(error);
      // res.json({ error });
    });

})







//////////////////////////////////////////////
// Cart Route - delete- push an item to the cart
//////////////////////////////////////////////
router.delete("/:id/:uid/cart", (req, res) => {
  // get the id from params
  const id = req.params.id;
  const uid = req.params.uid;
  // Product.findByIdAndRemove(id)
  User.findById(uid)
    // console.log(User.findById(uid))
    .then((user) => {
      user.cart.pull(id)
      user.save()

      res.redirect("/products/cartpage");


    })
    .catch((error) => {
      console.log(error);
      res.json({ error });
    });


});



//////////////////////////////////////////////
// Search Route
//////////////////////////////////////////////
router.get("/:id", (req, res) => {
  const id = req.params.id;
  const logged = req.session.loggedIn;

  Product.findById(id)
    .then((product) => {
      // const user = User.findOne({ username: req.session.username })
      // const qty = user.cart.length
      res.render("show", { product, logged });

    })
  // .catch((error) => {
  //   res.json({ error });
  // });
});




//////////////////////////////////////////
// Export the Router
//////////////////////////////////////////
module.exports = router;
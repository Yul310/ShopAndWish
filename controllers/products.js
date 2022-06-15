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

////////////////////////////////////////
// Router Middleware
////////////////////////////////////////
// Authorization Middleware
router.use((req, res, next) => {
  if (req.session.loggedIn) {
    next();
   

  } else {
    // res.redirect("/users/login");
   
  }
});


//////////////////////////////////////////////
// Index Route
//////////////////////////////////////////////
router.get("/", (req, res) => {
  console.log("working")
  Product.find({})
    
    .then((products) => {
      res.render("index", { products });
      console.log(products)
    })
    .catch((error) => {
      res.json({ error });
    });
});

//////////////////////////////////////////////
// Add Review Route
//////////////////////////////////////////////
// router.post("/:id/reviews", (req, res) => {
//   console.log("working")
//   res.send("working")
//   Product.findById(req.params.id)
//   .then((product)=>{
//     product.reviews.push(req.body);
//     product.save();
//     res.redirect(`/products/${product._id}`);
//   })
//   .catch((error) => {
//     console.log(error);
//     res.json({ error });
//   });
  
 

// })



//////////////////////////////////////////////
// Show Route
//////////////////////////////////////////////
router.get("/:id", (req, res) => {
  const id = req.params.id;
 
  Product.findById(id)
    
    .then((product) => {
      res.render("show", { product });
     
    })
    .catch((error) => {
      res.json({ error });
    });
});

//////////////////////////////////////////////
// Cart Route
//////////////////////////////////////////////

router.get("/:id/cart", (req,res) => {
  const productId = req.params.id;
  const cart = new Cart(req.session.cart ? req.session.cart :{})
  Product.findById(productId, function(err, product) {
    if (err) {
      return res.redirect('/');
    }
    cart.add(product,product._id)
    req.session.cart = cart;
    console.log(req.session.cart)
    res.redirect('/')
  })
})






//////////////////////////////////////////
// Export the Router
//////////////////////////////////////////
module.exports = router;
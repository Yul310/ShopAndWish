const Product = require('../models/product');
const express = require('express');
const router = express.Router();

router.post('/products/:id/reviews', create);
// router.post('/products/:id/reviews/edit', edit);
// module.exports = {
//     create
//   };

////////////////////////
// Review Create Route
////////////////////////

function create(req, res) {
  Product.findById(req.params.id, function (err, product) {
    if (req.session.loggedIn) {
      req.body.username = req.session.username;
      product.reviews.push(req.body);

      // ==== updating total review rating and rating count ====//
      product.ratings_total += 1;
      let a = req.body.rating/product.ratings_total + product.rating;
      product.rating = a.toFixed(1);
      // console.log(a.toFixed(1))
     
      product.save(function (err) {
        res.redirect(`/products/${product._id}`);
      })
    } else {
      res.redirect('/users/login')
    };
  });
}

////////////////////
//Review Edit Route
////////////////////

router.get("/products/:id/reviews/:reviewId/edit", (req, res) => {

  // if (req.session.username === req.body.username){
  const id = req.params.id;
  const rid = req.params.reviewId;

  // const name = req.params.username;
  Product.findById(id)

    .then((product) => {
      // console.log(product.reviews.find(review => review._id == rid))
      // I had a hard time finding the review in the array.
      const review = product.reviews.find(review => review._id == rid)
      if (req.session.username === review.username) {
        console.log(req.session.username)
        console.log(review.username)
        res.render("edit", { product, review });
      }
    })

    .catch((error) => {
      res.json({ error });
    });

});

////////////////////
//Review Edit Route
////////////////////
router.put("/products/:id/reviews/:reviewId/edit", (req, res) => {
  // get the id from params
  const id = req.params.id;
  const rid = req.params.reviewId;
  // get the data from the request body
  Product.findById(id)
    .then((product) => {
    
      //find the review in the array and update it

      const review = product.reviews.find((review )=> {return review._id == rid})
      review.content = req.body.content;
      review.rating = req.body.rating;

//== Revisit Work:  review rating total manipulation ==//
     
    
      // let a = review.rating/product.ratings_total + product.rating;
      // console.log(a)
      // product.rating = a;



      product.save(err => {
        if (err) {
          console.log(err);
        }
      })
    })
    .then((product) => {
      // redirect to main page after updating
      res.redirect(`/products/${req.params.id}`)
      // res.redirect("/products/62a7e10c43da5dc9301bc1fb");
    })
    // send error as json
    .catch((error) => {
      console.log(error);
      res.json({ error });
    });
});




///////////////////////
//Review Delete Route
///////////////////////

router.delete("/products/:id/reviews/:reviewId", (req, res) => {
  // get the id from params
  const id = req.params.id;
  const rid = req.params.reviewId;
  console.log("working")
  Product.findById(id)
    .then((product) => {
      // console.log(req.body)
      // console.log(product)
      //find the review in the array and update it
      const review = product.reviews.find((review )=> {return review._id == rid})
      console.log(review._id)
      review.remove()
      console.log(product)
      product.save(err => {
        if (err) {
          console.log(err);
        }
      })
    })
    .then((product) => {
      // redirect to main page after updating
      res.redirect(`/products/${req.params.id}`)
    })
    // send error as json
    .catch((error) => {
      console.log(error);
      res.json({ error });
    });


});



//////////////////////////////////////////
// Export the Router
//////////////////////////////////////////


module.exports = router;
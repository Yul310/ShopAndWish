const Product = require('../models/product');
const express = require('express');
const router = express.Router();

router.post('/products/:id/reviews', create);
// router.post('/products/:id/reviews/edit', edit);
// module.exports = {
//     create
//   };

///////////////////////
// Review Create Route
///////////////////////

function create(req, res) {
  Product.findById(req.params.id, function (err, product) {
    req.body.username = req.session.username;
    product.reviews.push(req.body);
    product.save(function (err) {
      res.redirect(`/products/${product._id}`);

    });
  });
}

////////////////////
//Review Edit Route
////////////////////

router.get("/products/:id/reviews/:reviewId/edit", (req, res) => {
  console.log("working")
  const id = req.params.id;
  const rid = req.params.reviewId;

  // const name = req.params.username;
  Product.findById(id)

    .then((product) => {
      console.log('working')
      console.log(product.reviews.find(review => review._id == rid))
      // I had a hard time finding the review in the array.
      const review = product.reviews.find(review => review._id == rid)
      res.render("edit", { product, review });
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
  Product.findById(id)
    .then((product) => {
      console.log(req.body)
      // console.log(product)
      const review = product.reviews.find(review => review._id == rid)

      // review.save(req.body)
      //  product.reviews.findOneAndUpdate(review => review._id == rid,req.body)
      review.content = req.body.content;
      review.rating = req.body.rating;
      console.log(review)
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
      // res.redirect("/products/62a7e10c43da5dc9301bc1fb");
    })
    // send error as json
    .catch((error) => {
      console.log(error);
      res.json({ error });
    });
});






// function edit(req, res) {
//   Product.findById(req.params.id, function(err, product) {
//   req.body.username = req.session.username;
//    product.reviews.push(req.body);
//     product.save(function(err) {
//       res.redirect(`/products/${product._id}`);

//     });
//   });
// }


module.exports = router;
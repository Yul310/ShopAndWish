const Product = require('../models/product');
const express = require('express');
const router = express.Router();
router.post('/products/:id/reviews', create);
// module.exports = {
//     create
//   };


  function create(req, res) {
    Product.findById(req.params.id, function(err, product) {
    req.body.username = req.session.username;
     product.reviews.push(req.body);
      product.save(function(err) {
        res.redirect(`/products/${product._id}`);

      });
    });
  }


  module.exports = router;
const express = require('express');
const router = express.Router();
const ProductController = require('./product.controler');
/* GET home page. */
router.get('/', ProductController.getProducts);
router.get('/search', ProductController.getProductsBySearch);
router.get('/detail/:id', ProductController.getProductDetail);
router.get('/detail',ProductController.productExample)
router.post('/detail/:id', ProductController.postReview);
module.exports = router;

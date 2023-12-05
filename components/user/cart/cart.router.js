const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  const scripts = [
    '/scripts/cart.js"',
  ];
  const styles = [
    "/styles/cart.css"
  ];
  res.render('user/cart-page', 
  {
    layout: 'user/layouts/layout', 
    title: "Your Shopping Cart",
    scripts: scripts,
    styles: styles,
  });
});

module.exports = router;

const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('home')
  console.log(req.user)
  const scripts = [
    '/scripts/landing-page.js',
  ];
  const styles = [
    "/styles/landing-page.css"
  ];

  res.render('user/home-page', 
  {
    layout: 'user/layouts/layout', 
    title: "TCG - Trading Card Game Store",
    scripts: scripts,
    styles: styles,
  });
});

module.exports = router;

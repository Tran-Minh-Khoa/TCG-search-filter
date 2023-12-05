const express = require('express');
const router = express.Router();

/* GET account (orders) page. */
router.get('/', function(req, res, next) {
  const scripts = [
  ];
  const styles = [
    "/styles/account.css"
  ];

  res.render('user/account-page', 
  {
    layout: 'user/layouts/layout', 
    title: "Account",
    scripts: scripts,
    styles: styles,
  });
});

/* GET addresses page. */
router.get('/addresses', function(req, res, next) {
    const scripts = [
    ];
    const styles = [
      "/styles/account.css"
    ];
  
    res.render('user/address-page', 
    {
      layout: 'user/layouts/layout', 
      title: "Addresses",
      scripts: scripts,
      styles: styles,
    });
  });  

module.exports = router;
const express = require('express');
const passport = require('passport');
const router = express.Router();
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('user/login-page');
});
// router.post('/', passport.authenticate('local-login'), function (req, res, next) {
//   console.log(req.user);
//   res.redirect('/');
// });
router.post('/', function (req, res, next) {
  passport.authenticate('local-login', function (err, user, info) {
    if (err) {
      console.log('Error from server:', err); // Log error from server
      return res.status(500).send(err);
    }
    if (!user) {
      console.log('Error from user:', info.message); // Log error from user
      return res.status(400).send(info.message);
    }
    // NEED TO CALL req.login()!!!
    req.login(user, function(err) {
      if (err) { return next(err); }
      return res.redirect('/account');
    });
  })(req, res, next);
}
);

module.exports = router;

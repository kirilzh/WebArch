const express = require('express');

const router = express.Router();

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  // req.flash('error_msg', 'You are not logged in');
  res.redirect('/users/login');
}

// Get Homepage
router.get('/', ensureAuthenticated, (req, res) => {
  res.render('index');
});


module.exports = router;

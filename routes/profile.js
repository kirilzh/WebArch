const express = require('express');

const router = express.Router();

// Get Homepage
router.get('/', (req, res) => {
  res.render('profile');
});

module.exports = router;

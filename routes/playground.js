const express = require('express');
const formidable = require('formidable');
const path = require('path');
const fs = require('fs');

let id = '';
const router = express.Router();

// Get Homepage
router.get('/', (req, res) => {
  id = req.user.aubgid;
  res.render('playground');
});

// Upload files
router.post('/', (req, res) => {
  console.log(id);
  // create an incoming form object
  const form = new formidable.IncomingForm();

  // create the path
  fs.mkdirSync(path.join(__dirname, `${'/uploads'}`));

  // store all uploads in the /uploads directory
  form.uploadDir = path.join(__dirname, '/uploads');

  // every time a file has been uploaded
  // rename it to it's original name
  form.on('file', (field, file) => {
    fs.rename(file.path, path.join(form.uploadDir, file.name));
  });

  form.on('error', (err) => {
    console.log(path.join(`${'An error has occured: \n'}`, err));
  });

  form.on('end', () => {
    res.end('success');
  });

  form.parse(req);
});

module.exports = router;

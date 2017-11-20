const express = require('express');
const formidable = require('formidable');
const path = require('path');
const fs = require('fs');

let id = '';
const router = express.Router();

// Get Homepage
router.get('/', (req, res) => {
  id = req.user.aubgid;
  // Set Static Folder
  router.use(express.static(path.join(__dirname, id)));
  res.render('playground');
});

// Upload files
router.post('/', (req, res) => {
  // create an incoming form object
  const form = new formidable.IncomingForm();

  // create the path
  if (!fs.existsSync(path.join(__dirname, `${'/'}${id}`))) {
    fs.mkdirSync(path.join(__dirname, `${'/'}${id}`));
  }

  // validate file extension
  form.onPart = function onPart(part) {
    if (!part.filename || part.filename.match(/\.(html|css|js)$/i)) {
      this.handlePart(part);

      // store all uploads in the /id directory
      form.uploadDir = path.join(__dirname, `${'/'}${id}`);

      // every time a file has been uploaded
      // rename it to it's original name
      form.on('file', (field, file) => {
        if (!fs.existsSync(path.join(form.uploadDir, file.name))) {
          fs.rename(file.path, path.join(form.uploadDir, file.name));
          req.flash('success_msg', 'File succesfully uploaded');
          res.redirect('/playground');
        } else {
          req.flash('error_msg', 'The file already exists');
          res.redirect('/playground');
        }
      });
    } else {
      req.flash('error_msg', 'This file extension is not allowed');
      res.redirect('/playground');
      console.log(part.filename, ' is not allowed');
    }
  };


  form.on('error', (err) => {
    console.log(path.join(`${'An error has occured: \n'}`, err));
  });
  form.parse(req);
});

module.exports = router;

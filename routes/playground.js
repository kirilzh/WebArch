const express = require('express');
const formidable = require('formidable');
const path = require('path');
const fs = require('fs');

let id = '';
let temp = '';
const router = express.Router();

// Get Homepage
router.get('/', (req, res) => {
  id = req.user.aubgid;
  // Set Static Folder
  router.use(`/${id}`, express.static(path.join(__dirname, id)));
  res.render('playground');
});

// send the user id to the browser
router.get('/id', (req, res) => {
  res.send({ message: id });
});


router.post('/docs', (req, res) => {
  temp = req.body;
  fs.truncate(path.join(__dirname, `${'/'}${id}`, '/index.html'), 0, () => {
    fs.writeFile(path.join(__dirname, `${'/'}${id}`, '/index.html'), temp[0], (err) => {
      if (err) {
        console.log(`'Error writing file: ' ${err}`);
      }
    });
  });
  fs.truncate(path.join(__dirname, `${'/'}${id}`, '/index.css'), 0, () => {
    fs.writeFile(path.join(__dirname, `${'/'}${id}`, '/index.css'), temp[1], (err) => {
      if (err) {
        console.log(`'Error writing file: ' ${err}`);
      }
    });
  });
});

router.get('/docs', (req, res) => {
  const HTML = temp[0];
  const CSS = `${'<style>'}${temp[1]}${'</style>'}`;
  const n = HTML.search('<head>') + 6;
  const result = [HTML.slice(0, n), CSS, HTML.slice(n)].join('');
  res.send(result);
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

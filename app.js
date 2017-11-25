const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const exphbs = require('express-handlebars');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
// const LocalStrategy = require('passport-local').Strategy;
// const mongo = require('mongodb');
const mongoose = require('mongoose');
// const fs = require('fs');

// const db = mongoose.connection;
mongoose.connect('mongodb://localhost:27017/test');

const routes = require('./routes/index');
const users = require('./routes/users');
const playground = require('./routes/playground');
const profile = require('./routes/profile');

// Init Index
const app = express();
// const mongoDB = 'mongodb://localhost:27017/test';

app.use(express.static(path.join(__dirname, 'public')));

// View Engine
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({ defaultLayout: 'layout' }));
app.set('view engine', 'handlebars');

// BodyParser & CookieParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false,
}));
app.use(cookieParser());

// serve the tree
// function getDirectories(dir) {
//   return fs.readdirSync(dir).filter((file) => {
//     return fs.statSync(dir, `${'/'} ${file}`).isDirectory();
//   });
// }

// console.log(getDirectories(__dirname, '/public'));

// const getDirs = (rootDir, cb) => {
//   fs.readdir(rootDir, (err, files) => {
//     const dir = [];
//     for (let index = 0; index < files.length; ++index) {
//       const file = files[index];
//       if (file[0] !== '.') {
//
//       }
//     }
//   })
// }

// Express Session
app.use(session({
  secret: 'secret',
  saveUninitialized: true,
  resave: true,
}));

// Passport Init
app.use(passport.initialize());
app.use(passport.session());

// Express Validator
app.use(expressValidator({
  errorFormatter: (param, msg, value) => {
    const namespace = param.split('.');
    const root = namespace.shift();
    let formParam = root;

    while (namespace.length) {
      formParam += path.join(`${'['}`, namespace.shift(), `${']'}`);
    }
    return {
      param: formParam,
      msg,
      value,
    };
  },
}));

// Connect flash
app.use(flash());

// Global Vars
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});


app.use('/', routes);
app.use('/users', users);
app.use('/playground', playground);
app.use('/profile', profile);

app.set('port', process.env.PORT || 3000);

app.listen(app.get('port'), () => {
  console.log('Server started on port ', app.get('port'));
});

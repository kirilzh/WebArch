const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const exphbs = require('express-handlebars');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
// const mongo = require('mongodb');
const mongoose = require('mongoose');
// const fs = require('fs');

const db = mongoose.connection;
mongoose.connect('mongodb://localhost:27017/test');

const routes = require('./routes/index');
const users = require('./routes/users');
const playground = require('./routes/playground');
const profile = require('./routes/profile');

// Init Index
const app = express();
// const mongoDB = 'mongodb://localhost:27017/test';


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

// takes the bundled js from webpack and sends it to the server
// app.use('/build', express.static(path.join(__dirname, '../build')));
// app.use('/client', express.static(path.join(__dirname, '../client')));

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

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
  console.log('Server started on port ' + app.get('port'));
});

// mongoose.connect(mongoDB, {
//   useMongoClient: true,
// });
//
// const Schema = mongoose.Schema;
// const usersSchema = new Schema({
//   name: String,
//   password: String,
//   email: String,
// });
//
// const fileSchema = new Schema({
//   userID: String,
//   name: String,
//   fileURL: String,
//   file: {
//     // atob var decodedData = window.atob(encodedData);
//     data: new Buffer('base64'),
//     contentType: String,
//   },
// });
//
// const User = mongoose.model('Users', usersSchema);
// const File = mongoose.model('Files', fileSchema);
//
// const site = new File();
// const filePath = '/home/kiril/Downloads/img.jpg';
// site.name = 'img.jpg';
// site.file.data = fs.readFileSync(filePath);
// site.file.contentType = 'image/jpg';
// site.fileURL = filePath;
// // site.save((err) => {
// //   if (err) throw err;
// //   console.error('saved image to mongo');
// // });
//
// db.on('error', console.error.bind(console, 'MongoDB connection error'));
// db.once('open', () => {
//   console.log('connected');
// });
//
//
// // loads the main HTML of the project
// app.get('/', (req, res) => {
//   res.sendFile(path.join(__dirname, '../index.html'));
// });
//
// app.get('/users', (req, res) => {
//   mongoose.model('Users').find((err, users) => {
//     res.send(users);
//   });
// });
//
// app.get('/files', (req, res) => {
//   mongoose.model('Files').find((err, files) => {
//     res.send(files);
//   });
// });
//
//
// app.post('/login', (req, res) => {
//   if (!req.body) return res.status(400);
//   new User({
//     name: req.body.username,
//     password: req.body.password,
//     email: req.body.email,
//   }).save((err) => {
//     if (err) console.log(err);
//   });
//   res.end('Post received ');
// });
//
// app.post('/files', (req, res) => {
//   if (!req.body) return res.status(400);
//   new File({
//     name: req.body.name,
//   }).save((err) => {
//     if (err) console.log(err);
//   });
//   res.end('File received');
// });
//
// app.listen('8888');

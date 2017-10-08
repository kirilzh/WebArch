const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const mongoDB = 'mongodb://localhost:27017/test';

mongoose.connect(mongoDB, {
  useMongoClient: true,
});

const Schema = mongoose.Schema;
const usersSchema = new Schema({
  name: String,
  password: String,
  email: String,
});

const User = mongoose.model('Users', usersSchema);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error'));
db.once('open', () => {
  console.log('connected');
});

// takes the bundled js from webpack and sends it to the server
app.use('/build', express.static(path.join(__dirname, '../build')));

// loads the main HTML of the project
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

app.get('/users', (req, res) => {
  mongoose.model('Users').find((err, users) => {
    res.send(users);
  });
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false,
}));
// app.use(express.json());
// app.use(express.urlencoded());
app.post('/login', (req, res) => {
  if (!req.body) return res.status(400);
  new User({
    name: req.body.username,
    password: req.body.password,
    email: req.body.email,
  }).save((err) => {
    if (err) console.log(err);
  });
  res.end('Post received ');
});

app.listen('8888');

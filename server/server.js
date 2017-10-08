const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const PORT = 8888;
const app = express();
const mongoDB = 'mongodb://localhost:27017/test';
const Schema = mongoose.Schema;
const usersSchema = new Schema({
  name: String,
  password: String,
  email: String,
});

const Users = mongoose.model('Users', usersSchema);
const firstUser = new Users({
  name: 'Kiril',
  password: 'hash',
  email: 'knz140@aubg.edu',
});
firstUser.save((err) => {
  if (err) console.log(err);
});

mongoose.connect(mongoDB, {
  useMongoClient: true,
});

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

app.listen(PORT);
// module.exports.start = start;

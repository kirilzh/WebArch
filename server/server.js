const http = require('http');
const express = require('express');
const fs = require('fs');
const path = require('path');
// const url = require('url');

const PORT = 8888;
const app = express();

// takes the bundled js from webpack and sends it to the server
app.use('/build', express.static(path.join(__dirname, '../build')));

// loads the main HTML of the project
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

app.listen(PORT);
// module.exports.start = start;

const http = require('http');
const express = require('express');
const fs = require('fs');
const path = require('path');
// const url = require('url');

const PORT = 8888;
const app = express();

app.use('/build', express.static(path.join(__dirname, '../build')));


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});


app.listen(PORT);
// module.exports.start = start;

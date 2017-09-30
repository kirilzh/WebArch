const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const request = require('request');

request.get('http://localhost:27017/test').on('response', function(response){
    console.log(response.statusCode);
    console.log(response.headers['content-type'])
  })

// Connection url
const url = 'mongodb://localhost:27017/test';

var insertDocuments = function(db, callback) {
  // Get the documents collection
  var collection = db.collection('documents');
  // Insert some documents
  collection.insertMany([
    {a : 1}, {a : 2}, {a : 3}
  ], function(err, result) {
    assert.equal(err, null);
    assert.equal(3, result.result.n);
    assert.equal(3, result.ops.length);
    console.log("Inserted 3 documents into the collection");
    callback(result);
  });
}

// use connect method to connect to the server
MongoClient.connect(url, function(err, db){
  assert.equal(null, err);
  console.log("connection successful to the server");

  insertDocuments(db, function() {
    db.close();
  })
});

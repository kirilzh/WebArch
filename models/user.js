const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

function toLower(str) {
  return str.toLowerCase();
}

const UserSchema = mongoose.Schema({
  aubgid: {
    type: String,
    index: true,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    set: toLower,
  },
  password: {
    type: String,
  },
});

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.createUser = (newUser, callback) => {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUser.password, salt, (err, hash) => {
      newUser.password = hash;
      newUser.save(callback);
    });
  });
};

module.exports.getUserByAubgid = (aubgid, callback) => {
  const query = {
    aubgid,
  };
  User.findOne(query, callback);
};

module.exports.getUserById = (id, callback) => {
  User.findById(id, callback);
};

module.exports.comparePassword = (candidatePassword, hash, callback) => {
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    if (err) throw err;
    callback(null, isMatch);
  });
};

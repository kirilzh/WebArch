const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const router = express.Router();
const User = require('../models/user');

// Register
router.get('/register', (req, res) => {
  res.render('register');
});

// Log In
router.get('/login', (req, res) => {
  res.render('login');
});

// Register User
router.post('/register', (req, res) => {
  const aubgid = req.body.aubgid;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const password = req.body.password;
  const vpassword = req.body.vpassword;

  // Validation
  req.checkBody('aubgid', 'AUBG ID is required').notEmpty();
  req.checkBody('firstName', 'First name is required').notEmpty();
  req.checkBody('lastName', 'Last name is required').notEmpty();
  req.checkBody('email', 'Email is required').notEmpty();
  req.checkBody('email', 'Email is not valid').isEmail();
  req.checkBody('password', 'Password is required').notEmpty();
  req.checkBody('vpassword', 'Passwords do not match').equals(req.body.password);

  const errors = req.validationErrors();

  if (errors) {
    res.render('register', {
      errors,
    });
  } else {
    const newUser = new User({
      aubgid,
      firstName,
      lastName,
      email,
      password,
    });

    User.find({ aubgid }, (err, user) => {
      if (user.length !== 0) {
        if (user[0].aubgid) {
          console.log(`${aubgid} is already used`);
          req.flash('error_msg', 'The ID is already used');
          res.redirect('/users/register');
        }
      } else {
        User.createUser(newUser);
        console.log(newUser);
        req.flash('success_msg', 'You are registered and can now log in');
        res.redirect('/users/login');
      }
    });
  }
});

passport.use(new LocalStrategy({
  usernameField: 'aubgid',
  passwordField: 'password',
},
(username, password, done) => {
  User.getUserByAubgid(username, (err, user) => {
    if (err) throw err;
    if (!user) {
      return done(null, false, { message: 'Unknown user' });
    }
    User.comparePassword(password, user.password, (err, isMatch) => {
      if (err) throw err;
      if (isMatch) {
        return done(null, user);
      }

      return done(null, false, { message: 'Invalid password' });
    });
  });
},
));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.getUserById(id, (err, user) => {
    done(err, user);
  });
});

router.post('/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login',
    failureFlash: true,
  }),
  (req, res) => {
    res.redirect('/');
  });

router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/users/login');
});

module.exports = router;

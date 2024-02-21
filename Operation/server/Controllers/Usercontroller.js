const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

const login = (req, res, next) => {
  const { username, password } = req.body;

  User.findOne({ $or: [{ email: username }, { userId: username }] })
    .then(user => {
      if (user) {
        bcrypt.compare(password, user.password, function(err, result) {
          if (err) {
            return res.status(500).json({
              error: err
            });
          }
          if (result) {
            const token = jwt.sign({ name: user.name }, 'AaBdr(23)', { expiresIn: '1h' });
            return res.json({
              message: 'Login Successful!',
              token
            });
          } else {
            return res.status(401).json({
              message: 'Password does not match!'
            });
          }
        });
      } else {
        return res.status(404).json({
          message: 'No user found!'
        });
      }
    })
    .catch(error => {
      return res.status(500).json({
        message: 'An error Occurred!'
      });
    });
}

// Show the list of users
const index = (req, res, next) => {
  User.find()
    .then(users => {
      res.json({
        users
      });
    })
    .catch(error => {
      res.status(500).json({
        message: 'An error Occurred!'
      });
    });
}

//show single user by id
const show = (req, res, next) => {
  const { userId } = req.body;

  User.findById(userId)
    .then(user => {
      if (user) {
        res.json({
          user
        });
      } else {
        res.status(404).json({
          message: 'User not found!'
        });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: 'An error Occurred!'
      });
    });
}

//add user 
const register = (req, res, next) => {
  const { userId, username, password, fullname, contact, email, role, doj } = req.body;

  // Check if the user already exists
  User.findOne({ $or: [{ email }, { userId }] })
    .then(existingUser => {
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }

      // Hash the password
      bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
          return res.status(500).json({ error: err });
        }

        // Create a new user with hashed password
        const newUser = new User({
          userId,
          username,
          password: hashedPassword,
          fullname,
          contact,
          email,
          role,
          doj
        });

        // Save the new user to the database
        newUser.save()
          .then(savedUser => {
            // Create JWT token for authentication
            const token = jwt.sign({ userId: savedUser.userId }, 'your-secret-key', { expiresIn: '1h' });
            return res.status(201).json({ message: 'User registered successfully', token });
          })
          .catch(saveError => {
            return res.status(500).json({ error: saveError });
          });
      });
    })
    .catch(error => {
      return res.status(500).json({ error: 'An error occurred while registering the user' });
    });
};

//update an user
const update = (req, res, next) => {
  const { userId } = req.body;

  const updateData = {
    userId: req.body.userId,
    username: req.body.username,
    password: req.body.password,
    fullname: req.body.fullname,
    contact: req.body.contact,
    email: req.body.email,
    role: req.body.role,
    doj: req.body.doj
  };

  User.findByIdAndUpdate(userId, { $set: updateData }, { new: true })
    .then(user => {
      if (user) {
        res.json({
          message: 'User updated successfully!',
          user
        });
      } else {
        res.status(404).json({
          message: 'No user found with that id!'
        });
      }
    })
    .catch(error => {
      res.status(500).json({
        message: 'An error Occurred!'
      });
    });
}

//delete an employee
const destroy = (req, res, next) => {
  const { userId } = req.body;

  User.findByIdAndDelete(userId)
  .then(() => {
    res.json({ message: 'User deleted successfully.' });
  })
  .catch((err) => {
    res.status(500).json({ message: 'Error deleting user.', err });
  });
};

module.exports = { login, index, show, register, update, destroy };

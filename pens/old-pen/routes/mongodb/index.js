/* eslint new-cap: 0*/
const express = require('express');
const mongoose = require('mongoose');
const Users = require('../../lib/mongodb/models/users');
const router = express.Router();

function errorResponse(res, err) {
  res.status(500).send(err.stack);
}

router.get('/users', (req, res) => {
  mongoose.model('users').find((err, users) => {
    if (err) return errorResponse(res, err);
    res.status(200).send(users);
  });
});

router.get('/user/save', (req, res) => {
  const user = new Users({
    name: 'Jakie',
    age: 99,
  });

  user.save(err => {
    if (err) return errorResponse(res, err);
    res.status(200).send('Succeeded');
  });
});

router.get('/user/update', (req, res) => {
  Users.update(
    { _id: '56c6eef05afdd4fd43cc8a43' },
    { $set: { age: 50 } },
    (err, user) => {
      if (err) return errorResponse(res, err);
      res.status(200).send(user);
    }
  );
});

module.exports = router;

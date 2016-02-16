const express = require('express');
const mongoose = require('mongoose');
const users = require('../../lib/mongoose/models/users');
const router = express.Router();

router.get('/user/save', (req, res) => {
    const user = new users({ name: 'bill' });

    user.save(err => {
        if (err) return res.status(500).send(err.stack);
        res.status(200).send('Succeeded');
    });
});

router.get('/users', (req, res) => {
    mongoose.model('users').find((err, users) => {
        if (err) return res.status(500).send(err.stack);
        res.status(200).send(users);
    });
});

module.exports = router;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usersSchema = new Schema({
    name: String
});

module.exports = mongoose.model('users', usersSchema);
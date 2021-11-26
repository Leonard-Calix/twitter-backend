const { model, Schema } = require('mongoose');

const schema = Schema({
    name: String,
    userName : String,
    lastName: String,
    email: String,
    password : String,
    phone: String
});

module.exports = model('User', schema);

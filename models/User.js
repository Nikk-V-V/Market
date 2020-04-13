const {Schema, model} = require('mongoose');

const user = new Schema({
    login: {type: String},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true}
})

module.exports = model('User', user)
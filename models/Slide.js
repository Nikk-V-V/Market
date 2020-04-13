const {Schema, model} = require('mongoose');

const slide = new Schema({
    image: {type: String, required: true}
})

module.exports = model('Slide', slide)
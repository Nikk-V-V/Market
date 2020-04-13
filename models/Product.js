const {Schema, model, Types} = require('mongoose');

const product = new Schema({
    title: {type: String, required: true, unique: true},
    description: {type: String, required: true},
    image: {type: String, required: true},
    price: {type: Number, required: true},
    rating: {type: Number, default: 0},
    category: {type: Types.ObjectId, ref: 'Category', required: true},
    owner: {type: Types.ObjectId, ref: 'User'},
    review: [{type: String}]
})

module.exports = model('Product', product)
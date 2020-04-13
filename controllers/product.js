const Product = require('../models/Product');
const fs = require('fs');



module.exports.create = async (req, res) => {
    try {
        const {title, description, price, category} = req.body;

        const file = JSON.parse(fs.readFileSync('./data/Product.json', 'utf-8'));

        console.log(req.decoded.user)

        const product = new Product({
            title,
            description,
            category,
            price,
            owner: req.decoded.user._id,
            image: req.file ? req.file.path : ''
        })

        file.push(product);

        fs.writeFileSync('./data/Product.json', JSON.stringify(file, null, '\t'));

        res.status(200).json({message: "Успіх", product})

    } catch (e) {
        res.status(500).json({message: e.message})
    }
}

module.exports.getByCategory = async (req, res) => {
    try {
        const file = await JSON.parse(fs.readFileSync('./data/Product.json', 'utf-8'));

        const products = file.filter(x => x.category === req.params.id)

        res.status(200).json({message: "Успіх", products})

    } catch (e) {
        res.status(500).json({message: e.message})
    }
}

module.exports.getById = async (req, res) => {
    try {
        const file = await JSON.parse(fs.readFileSync('./data/Product.json', 'utf-8'));

        const product = file.find(x => x._id === req.params.id)

        res.status(200).json({message: 'Успіх', product})

    } catch (e) {
        res.status(500).json({message: e.message})
    }
}

module.exports.getAll = async (req, res) => {
    try {
        const products = await JSON.parse((fs.readFileSync('./data/Product.json', 'utf-8')))

        res.status(200).json({message: "Успіх", products})
    } catch (e) {
        res.status(500).json({message: e.message})
    }
}
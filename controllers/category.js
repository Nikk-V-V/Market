const Category = require('../models/Category');
const fs = require('fs');



module.exports.create = async (req, res) => {
    try {
        const file = JSON.parse(fs.readFileSync('./data/Category.json', 'utf-8'));

        const title = req.body.title;

        isMath = file.find(x => x.title === title);

        if (isMath) return res.status(400).json({message: 'Така категорія вже існує'});

        const category = new Category({
            title,
            image: req.file ? req.file.path : ''
        })

        file.push(category);

        fs.writeFileSync('./data/Category.json', JSON.stringify(file, null, '\t'));

        res.status(200).json({message: "Успіх", category})

    } catch (e) {
        res.status(500).json({message: e.message})
    }
}

module.exports.getAll = async (req, res) => {
    try {
        const category = JSON.parse(fs.readFileSync('./data/Category.json', 'utf-8'));

        res.status(200).json({
            message: "Успіх",
            category
        })
    } catch (e) {
        res.status(500).json({message: e.message})
    }
}

module.exports.getById = async (req, res) => {
    try {
        const file = JSON.parse(fs.readFileSync('./data/Category.json', 'utf-8'));

        const category = file.filter(x => x._id === req.params.id)

        console.log(category)

        if (!category) return  res.status(400).json({message: 'Такої категорії не найдено'})

        res.status(200).json({
            message: "Успіх",
            category
        })
    } catch (e) {
        res.status(500).json({message: e.message})
    }
}
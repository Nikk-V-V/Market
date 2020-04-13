const Slide = require('../models/Slide');
const fs = require('fs');



module.exports.create = async (req, res) => {
    try {
        const file = JSON.parse(fs.readFileSync('./data/Slide.json', 'utf-8'));

        const slide = new Slide({
            image: req.file ? req.file.path : ''
        });

        file.push(slide);

        fs.writeFileSync('./data/Slide.json', JSON.stringify(file, null, '\t'));

        res.status(200).json({message: "Успіх", slide})

    } catch (e) {
        res.status(500).json({message: e.message})
    }
}

module.exports.getAll = async (req, res) => {
    try {
        const slide = await JSON.parse(fs.readFileSync('./data/Slide.json', 'utf-8'));

        res.status(200).json({
            slide
        })
    } catch (e) {
        res.status(500).json({message: e.message})
    }
}

module.exports.update = (req, res) => {
    try {

    } catch (e) {
        res.status(500).json({message: e.message})
    }
}

module.exports.delete = async (req, res) => {
    try {
        const file = await JSON.parse(fs.readFileSync('./data/Slide.json', 'utf-8'));

        let slide = []
        file.map(x =>  x._id !== req.params.id ? slide.push(x) : null);

        console.log(slide)

        fs.writeFileSync('./data/Slide.json', JSON.stringify(slide, null, '\t'));

        res.status(200).json({
            slide
        })

    } catch (e) {
        res.status(500).json({message: e.message})
    }
}
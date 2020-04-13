const User = require("../models/User");
const fs = require('fs');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

module.exports.login = async (req, res) => {
    try {

        const file = JSON.parse(fs.readFileSync('./data/User.json', 'utf-8'));

        const {email, password} = req.body;

        const user = file.find(x => x.email === email);

        if (!user) return res.status(400).json({ message: 'Користувач не найдений' });

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) return res.status(400).json({ message: 'Не правельний пароль, спробуйте знову' });

        const token = jwt.sign(
            { user: user },
            config.get('secret'),
            { expiresIn: '7h' }
        )

        res.status(200).json({ success: 'Success',token, user: user})

    } catch (e) {
        res.status(500).json(e.message)
    }
}

module.exports.register = async (req, res) => {
    try {
        const {email, password} = req.body;

        const file = JSON.parse(fs.readFileSync('./data/User.json', 'utf-8'));

        const candidate = file.find(x => x.email === email);

        if (candidate) return  res.status(400).json({message: "Такий користувач вже існує"});

        const hashedPassword = await bcrypt.hash(password,12);

        const user = new User({email, password: hashedPassword});

        file.push(user)

        fs.writeFileSync('./data/User.json', JSON.stringify(file, null, '\t'));

        res.status(200).json({message: "Успіх", user})
    } catch (e) {
        res.status(500).json(e.message)
    }
}

module.exports.getProfile = (req, res) => {
    try {
        const user = req.decoded.user

        console.log(req)

        res.status(200).json({message: 'Успіх', user})
    } catch (e) {
        res.status(500).json(e.message)
    }
}
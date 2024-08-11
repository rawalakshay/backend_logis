const User = require('../models/Users.js');

exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
        console.log('users :>>', users);
        res.status(200).json(users);
    } catch (err) {
        console.error('getUsers err :>>', err)
        res.status(500).json({ message: 'Error fetching users' });
    }
};

exports.createUser = async (req, res) => {
    const newUser = new User(req.body);
    try {
        const user = await newUser.save();
        res.status(201).json(user);
    } catch (err) {
        res.status(500).json({ message: 'Error creating user' });
    }
};

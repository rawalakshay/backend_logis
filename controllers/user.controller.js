const User = require('../models/Users.js');

exports.getUsers = async (req, res) => {
    try {
        const users = await User.find();
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

exports.login = async (req, res) => {
    const userId = req.body.userId;
    const password = req.body.password;
    if (!userId || !password) return res.status(500).json({ message: 'userId and password required' });
    try {
        const user = await User.findOne({ userId, password });
        if (user) {
            return res.status(200).json({ success: true, msg: 'login success' });
        }
        return res.status(401).json({ success: false, msg: 'wrong user and pass' });
    } catch (err) {
        console.error('login err:>>', err);
        res.status(500).json({ message: 'Error creating user' });
    }
};

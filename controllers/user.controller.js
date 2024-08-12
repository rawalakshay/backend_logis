const User = require('../models/Users.js');
const TimePunch = require('../models/Time_Punch.js');


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
        console.error('createUser err:>>', err);
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

exports.punchIn = async (req, res) => {
    const userId = req.body.userId;
    const { punchInlatitude, punchInlongitude } = req.body;
    if (!userId || !punchInlatitude || !punchInlongitude) return res.status(500).json({ message: 'userId, punchInlatitude, punchInlongitude required' });
    try {
        // Check if the user already punched in today
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        let punch = await TimePunch.findOne({
            userId: userId,
            punchIn: { $gte: today }
        });

        if (punch) {
            return res.status(400).json({ message: 'You have already punched in today.' });
        }

        // Create a new punch-in record
        punch = new TimePunch({
            userId: userId,
            punchIn: new Date(),
            punchInlatitude: punchInlatitude,
            punchInlongitude: punchInlongitude
        });

        await punch.save();
        res.status(200).json({ message: 'Punched in successfully', punch });
    } catch (error) {
        console.error('punchIn :>>', error)
        res.status(500).json({ message: 'Internal server error', error });
    }
};

exports.punchOut = async (req, res) => {
    const userId = req.body.userId;
    const { punchOutlatitude, punchOutlongitude } = req.body;
    if (!userId || !punchOutlatitude || !punchOutlongitude) return res.status(500).json({ message: 'userId, punchOutlatitude, punchOutlongitude  required' });
    try {
        // Find the latest punch-in record for the user
        const punch = await TimePunch.findOne({
            userId: userId,
            punchOut: null
        }).sort({ punchIn: -1 });

        if (!punch) {
            return res.status(400).json({ message: 'No punch-in record found for today.' });
        }

        punch.punchOut = new Date();
        punch.punchOutlatitude = punchOutlatitude;
        punch.punchOutlongitude = punchOutlongitude;
        await punch.save();
        res.status(200).json({ message: 'Punched out successfully', punch });
    } catch (error) {
        console.error('punchOut :>>', error)
        res.status(500).json({ message: 'Internal server error', error });
    }
}

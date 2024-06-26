
const express = require('express');
const bodyParser = require('body-parser');
const User = require('../models/User');

const router = express.Router();
router.use(bodyParser.json());


router.post('/signup', async (req, res) => {
    try {
        const { username,email, password } = req.body;

       
        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ message: 'Mail address already exists' });
        }

       
        const newUser = new User({ username, email, password});
        await newUser.save();

        res.status(201).json({ message: 'Signup successful' });
    } catch (error) {
        console.error('Error signing up:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        
if (password !== user.password) {
    return res.status(401).json({ message: 'Invalid username or password' });
}


        res.json({ message: 'Login successful', user });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;

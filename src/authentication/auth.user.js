const express = require('express');

const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('../Utils/jwtUtils');
const User = require('../models/User');

// Register Route
router.post('/register', async (req, res) => {
    const { firstName, lastName, userType, email, password } = req.body;

    try {
        let user = await User.findOne({ userType, email });
        if (user) {
            return res.json({ data: { message: "User already exists", status: false } });
        }

        // Create New User
        user = new User({
            firstName,
            lastName,
            name: `${firstName} ${lastName}`,
            userType,
            email,
            password
        });

        // Hash Password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        // Save User
        await user.save();

        // Generate JWT
        const payload = {
            user: {
                _id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                name: user.name,
                userType: user.userType,
                email: user.email
            }
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '72h' });

        return res.json({ data: { accessToken: token, user: payload.user }, status: true, message: 'Sign up Successful.' });
    } catch (err) {
        console.error(err.message);
        return res.status(500).send("Server error");
    }
});

// Login Route
router.post('/login', async (req, res) => {
    const { userType, email, password } = req.body;

    try {
        const user = await User.findOne({ email, userType });

        if (!user) {
            return res.json({ message: 'Invalid credentials!', status: false });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ message: 'Invalid credentials!' });
        }

        // Generate JWT
        const payload = {
            user: {
                _id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                name: user.name,
                userType: user.userType,
                email: user.email
            }
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '72h' });

        return res.json({ data: { accessToken: token, user: payload.user }, status: true, message: 'Login Successful.' });
    } catch (err) {
        console.error(err.message);
        return res.status(500).send("Server error");
    }
});

router.post('/logout', (req, res) => {
    // Invalidate the token if using a blacklist (optional)
    res.json({ data: { message: 'Logged out successful.', status: true } });
});

module.exports = router;
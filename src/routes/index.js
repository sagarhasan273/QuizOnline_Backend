
const express = require('express');
const User = require('../models/User');

const router = express.Router();
const jwt = require('../Utils/jwtUtils');

router.get('/', async (req, res) => {
    const token = req.header('Authorization').replace('Bearer ', '');

    if (!token || token === 'Bearer') {
        return res.json({ data : { message: 'No token, authorization denied!', status: false } });
    }

    try {
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded?.user?._id).select('-password');

        return res.json({ data: { user, status: true } });
    } catch (err) {
        return res.status(401).json({ message: 'Token is not valid.' });
    }
});

router.use('/auth', require('../authentication'));

module.exports = router;
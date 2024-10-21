const express = require('express');

const router = express.Router();

const User = require('../models/User');

router.get('/quizzes-registered', async (res, req) => {
    
    try {
        const { userId } = res.query;
        const userWithQuizzes = await User.findById(userId).populate('quizzes');

        return req.json({ status: true, data: { quizzes: userWithQuizzes?.quizzes || [] }, message: 'All registered quizzes fetch successfully!.'});

    } catch (error) {
        return req.json({ status: false, message: error.message });
    }

});

router.post('/quiz-register', async (res, req) => {
    
    try {
        const { userId, quizId } = res.body;
        const user = await User.findById(userId);

        if (!user.quizzes.includes(quizId)) {
            user.quizzes.push(quizId);

            await user.save();

            return req.json({ status: true, message: 'Registation successfull!.'});
        } 

        return req.json({ status: false, message: 'Duplicate registration!' });
    } catch (error) {
        return req.json({ status: false, message: error.message });
    }

});


module.exports = router;
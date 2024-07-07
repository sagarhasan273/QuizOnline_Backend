const express = require('express');
const moment = require('moment');
const Quiz = require('../models/Quiz');

const router = express.Router();

router.get('/', async (req, res) => {
    try{
        const quizzes = await Quiz.find();
        return res.json({ data: quizzes, status: true, message: 'All Quizzes.'});
    } catch (error){
        return res.json({ status: false, message: 'All quizzes fetch issue.'});
    }
})

router.post('/add', async (req, res) => {
    try {
        const { title, description, startDateTime, endDateTime } = req.body;

        const start = moment(startDateTime).format('YYYY-MM-DD HH:mm');
        const end = moment(endDateTime).format('YYYY-MM-DD HH:mm');
        
        const newQuiz = new Quiz({
            title,
            description,
            startDateTime: start,
            endDateTime: end,
        });

        console.log({
            title,
            description,
            startDateTime: start,
            endDateTime: end,
        });

        await newQuiz.save();

        return res.json({ status: true, message: 'Quiz created successfully.' })
    } catch (error) {
        return res.json({ message: error, status: false})
    }
});

module.exports = router;
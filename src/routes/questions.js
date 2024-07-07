const express = require('express');
const Questions = require('../models/Questions');

const router = express.Router();

router.get('/questions', async (req, res) => {
    try {
        const questions = await Questions.find();
        return res.json({ data: questions, status: true, message: 'All questions fetched.'});
    }catch (error){
        return res.json({status: false, message: 'All questions unable to fetch.'})
    }
});

router.post('/question/add', async (req, res) => {
    try {
        const questionData = req.body;
        const questions = new Questions(questionData);
        await questions.save();
        return res.json({ data: questionData, status: true, message: 'Question added sucessfully.' });
    } catch (error) {
        return res.status(500).json({ error })
    }
});

router.use('/quiz', require('./quiz'));

module.exports = router;
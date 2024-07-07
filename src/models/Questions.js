const mongoose = require('mongoose');

const QuestionsSchema = new mongoose.Schema({
    answerType: {
        type: String,
        required: true,
    },
    question: {
        type: String,
        required: true,
    },
    answerList: [{
        type: String,
        required: true
    }],
    optionsList: [
        {
            optionLabel: { type: String, required: true },
            optionValue: { type: String, required: true }
        }
    ]
});

module.exports = mongoose.model('Questions', QuestionsSchema);
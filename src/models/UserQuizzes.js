const mongoose = require("mongoose");

const UserQuizzes = new mongoose.Schema({
    user_id: {
        type: String,
        required: true,
    },
    user_quizzes: [
        {
            quiz_id: {
                type: String,
                required: true,
            },
            title: {
                type: String,
                required: true,
            },
            description: {
                type: String,
                required: true,
            },
            startDateTime: {
                type: Date,
                required: true
            },
            endDateTime: {
                type: Date,
                required: true,
            }
        }
    ]
})

module.exports = mongoose.model('userQuizzes', UserQuizzes);
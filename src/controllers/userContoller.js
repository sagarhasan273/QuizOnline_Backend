const express = require('express');

const router = express.Router();

router.post('/quiz-register', (res, req) => {
    const { userId, quizId } = res.body;
    console.log(userId, quizId);

    return req.json({ status: false, message: 'Something wrong here!' })
});


module.exports = router;
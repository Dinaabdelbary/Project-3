const router = require('express').Router();
const Message = require('../models/Message');


router.get('/', (req, res) => {
    Message.find().populate('sendBy')
        .then(allMessages => res.status(200).json(allMessages))
        .catch(error => res.status(500).json(error))
});

router.post('/new-message', (req, res) => {
    const { sendBy, newMessage } = req.body
    Message.create({
        sendBy: sendBy._id,
        message: newMessage
    })
        .then(newMessage => res.status(200).json(newMessage))
        .catch(error => res.status(500).json(error))
})



module.exports = router;

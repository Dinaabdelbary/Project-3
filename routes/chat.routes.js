const express = require("express");
const Conversation = require("../models/Conversation.model");
const router = express.Router();



router.post('/conversation', (req, res) => {
    const { participants } = req.body;
    Conversation.find({ "participants": { "$all": participants } })
        .then(match => {
            if (!match.length) {
                const newConv = new Conversation({
                    participants
                });
                newConv.save().then(conv => res.json(conv))
            } else {
                res.json(match[0])
            }
        }).catch(err => console.log(err))
});

router.post('/conversation/:id/new-message', (req, res) => {
    const { id } = req.params;
    const { messageData } = req.body;

    Conversation.findByIdAndUpdate(id,
        {
            $push: { 'messages': messageData }
        },
        {
            new: true
        }
    ).then(updatedConversation => {
        res.json(updatedConversation)
    }).catch(err => console.log(err))
})

module.exports = router;
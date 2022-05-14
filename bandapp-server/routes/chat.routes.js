const express = require("express");
const Conversation = require("../models/Conversation.model");
const router = express.Router();

router.post('/conversation/create', (req, res) => {
    const {participants} = [];
    Conversation.create({participants})
    .then(newConv => {
        res.json(newConv);
    })
    .catch(err => {
        res.json(err)
    })
});

router.get('/conversation/:id', (req, res) => {
    const {id} = req.params;
    Conversation.findById(id)
    .then(match => {
        res.json(match)
    })
    .catch(err => {
        res.json(err)
    })
})
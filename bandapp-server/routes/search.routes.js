const express = require("express");
const User = require("../models/User.model");
const router = express.Router();

router.get("/search", (req, res) => {
  const { q } = req.query;
 console.log(q)
  User.find({$text : {$search: q ? q : ""}})
    .then((users) => {  
      console.log(users)
      res.json(users)})
    .catch((err) => console.error(err));
});
module.exports = router;



//{$or: [ {name:q}, {location:q}, {genres:q}, {instruments:q}]}
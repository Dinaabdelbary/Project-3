const express = require("express");
const User = require("../models/User.model");
const router = express.Router();

router.get("/search", (req, res) => {
  const { query } = req;
  // console.log(query);
  User.find(query)
    .then((users) => console.log(users))
    .catch((err) => console.error(err));
});
module.exports = router;

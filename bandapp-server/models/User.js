
const { Schema, model } = require("mongoose");

const userSchema = Schema({
    email : {
      type: String,
      required: true,
    },
    password : {
      type: String,
      required: true
    },
    name : {
      type: String, //list of instruments and proficiency(not required)
      required: true
    },
    instruments : {
      type: String, //list of instruments and proficiency(not required)
      required: true
    },
    location : {
      type: String, ////
      required: false,
    },
    image : {
      type: String,  ///
      required: false,
    },
    listensto : {
      type: String, //connect to spotify api
      required: false,
    },
    genre : {
      type: String, ///list of genres
      required: false,
    },
    history : {
      type: String,
      required: false,
    },
    connections : {
      type: String,
      required: false,
    },
})


module.exports = model("User",userSchema);

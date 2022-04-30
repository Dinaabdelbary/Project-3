
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
    instruments : [String],
    location : String,
    image : String,
    listensto : [String],
    genres : [String],
    history : String,
    connections : [String]
})


module.exports = model("User",userSchema);

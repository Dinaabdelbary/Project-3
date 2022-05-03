
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
    personalchat : [{type: Schema.Types.ObjectId, ref:'Chat'}],
    instruments : [String],
    location : String,
    image : String,
    listensto : [String],
    genres : [String],
    history : String,
    connections : [String]
})


module.exports = model("User",userSchema);

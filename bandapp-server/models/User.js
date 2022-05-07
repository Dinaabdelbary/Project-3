
const { Schema, model } = require("mongoose");
const Band = require('./Band')

const userSchema = Schema({
    email : {
      type: String,
      required: true,
      unique: true
    },
    password : {
      type: String,
      required: true,
    },
    name : {
      type: String, //list of instruments and proficiency(not required)
      required: true
    },
    instruments : [String],
    location : String, //possible API call to location API, otherwise just city
    image : String,
    listensto : [String], //possible API call to Spotify
    genres : [String],
    history : String,
    currentBands: [{type: Schema.Types.ObjectId, ref:Band}],
    pendingSentRequests: [{type: Schema.Types.ObjectId, ref: "User"}],
    pendingReceivedRequests: [{type: Schema.Types.ObjectId, ref: "User"}],
    friendList: [{type: Schema.Types.ObjectId, ref: "User"}]
})


module.exports = model("User", userSchema);

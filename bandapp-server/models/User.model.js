const { Schema, model } = require("mongoose");
const Band = require('./Band.model')

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
    profilePicture : {
      type: String,
      default: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Musician_-_The_Noun_Project.svg/1200px-Musician_-_The_Noun_Project.svg.png'
    },
    coverPhoto: String,
    profilePicture: String,
    listensto : [String], //possible API call to Spotify
    genres : [String],
    bio : String,
    currentBands: [{type: Schema.Types.ObjectId, ref:Band}],
    pendingSentRequests: [{type: Schema.Types.ObjectId, ref: "User"}],
    pendingReceivedRequests: [{type: Schema.Types.ObjectId, ref: "User"}],
    friendList: [{type: Schema.Types.ObjectId, ref: "User"}]
})

userSchema.index({name:'text', location:'text', genres:'text', instruments:'text'})


module.exports = model("User", userSchema);

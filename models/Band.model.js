const { Schema, model } = require("mongoose");
const User = require('./User.model')

const bandSchema = Schema({
    name : {
      type: String,
      required: true
    },
    genres: [String],
    members: [{type: Schema.Types.ObjectId, ref:User}],
    imageUrl: String,
    description: String,
    //medialinks: [String], In case we wanna add Spotify, bandcamp links to listen to their music
    //referenceBands: [String], Possible API calls from Spotify
})


module.exports = model("Band", bandSchema);

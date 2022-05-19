const { Schema, model } = require("mongoose");

const conversationSchema = new Schema(
    {
   participants: [{
       type: Schema.Types.ObjectId, ref: 'User'
   }],

   messages : [{
       type: Schema.Types.Mixed
   }]
},
       {
            timestamps:true,
        }
);


module.exports = model("Conversation",conversationSchema);
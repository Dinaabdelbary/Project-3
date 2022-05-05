const  messageSchema = new Schema(
    {
    message : {
        text : {
            type:String,
            required: true,
        },
    },
        users: Array,
        sender : {
            type:mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        
    },
},
       {
            timestamps:true,
        }
);


module.exports = model("Messages",messageSchema);
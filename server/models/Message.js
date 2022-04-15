const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
    
    
    

    author: new mongoose.Schema({
        name: {
            type: String,
            required: true,
        },
        id: {
            type: String,
            required: true,
        }
        
    }),

    receiver: new mongoose.Schema({
        name: {
            type: String,
            required: true,
        },
        id: {
            type: String,
            required: true,
        }
        
    }),

    messageBody : {
        type: String,
        required: true,
    },

    messageId: {
        type: String,
        required: true,
    },

    conversationId:{
        type: String,
        required: true,
    },

    
        
},
{timestamps: true}
)

module.exports = mongoose.model("Message", MessageSchema);
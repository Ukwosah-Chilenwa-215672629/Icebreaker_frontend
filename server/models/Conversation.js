const mongoose = require("mongoose");

const ConversationSchema = new mongoose.Schema(
    {

    members: {
        type: Array,
    },

    conversationId: {
        type: Number,
    },
    
    },

{timestamps: true}

);

module.exports = mongoose.model("Conversation", ConversationSchema);
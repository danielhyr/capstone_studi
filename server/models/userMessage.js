import mongoose from 'mongoose';

const userMessageSchema = mongoose.Schema(
    {
        conversationId: {
            type: String,
        },

        sender:{
            type: String
        },
        text: {
            type: String,
        },

    }, 
    {timestamps: true}
);

const UserMessage = mongoose.model('userMessage', userMessageSchema);

export default UserMessage;

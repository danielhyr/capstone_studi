import mongoose from 'mongoose';

const conversationSchema = mongoose.Schema(
    {
        member: {
            type: Array,
        },
    }, {timeStamps: true}
)

const Conversation = mongoose.model('Conversation', conversationSchema);

export default Conversation;

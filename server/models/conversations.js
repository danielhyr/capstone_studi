import mongoose from 'mongoose';

const conversationSchema = mongoose.Schema(
    {
        member: {
            type: Array,
        },
    }, {timestamps: true}
)

const PostMessage = mongoose.model('Conversation', conversationSchema);

export default PostMessage;

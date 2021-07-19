import mongoose from 'mongoose';

const commentsSchema = mongoose.Schema({
    text: String,
    image: String,
    name: String,
    likes: {
        type: [String],
        default: [],
    },    
    timestamp: String,
    postId: String
})

const Comment = mongoose.model('Comments', commentsSchema);


export default Comment;
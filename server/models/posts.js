import mongoose from 'mongoose';

const postSchema = mongoose.Schema({
    title: String,
    schedule: Array,
    likes: {
        type: [String],
        default: [],
    },    
    createdAt: {
    type: Date,
    default: new Date()
    },
    timestamp: Number,
    message: String,
    creator: String,
    name:String,
    image:String,
    checked: Boolean,
})

const Posts = mongoose.model('PostMessage', postSchema);

export default Posts;

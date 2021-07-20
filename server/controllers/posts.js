import Post from '../models/posts.js';
import mongoose from 'mongoose';


export const getPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts);
    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}
export const createPost = async (req, res) => {
    const post = req.body;
    const newPost = new Post({ ...post, creator: req.userId, createdAt: new Date().toISOString() });
    try {
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({ message: error.message })
    }
}

export const updatePost = async (req, res) => {
    const { id } = req.params
    const { title, timestamp, schedule } = req.body
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No post with this id")
    const updatedPost = { title, timestamp, schedule, _id: id };
    await Post.findByIdAndUpdate(id, updatedPost, { new: true });
    res.status(201).json(updatedPost);
}

export const deletePost = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No post with this id")
    await Post.findByIdAndRemove(id);
    res.json({ message: 'Post deleted successfully' })
}

export const likePost = async (req, res) => {
    const { id } = req.params
    if (!req.userId) return res.json({ message: " Unauthenticated" })
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No post with this id")
    const post = await Post.findById(id);
    const index = post.likes.findIndex((id) => id === String(req.userId))
    if (index === -1) {
        post.likes.push(req.userId);
    } else {
        post.likes = post.likes.filter((id) => id !== String(req.userId))
    }
    const updatedPost = await Post.findByIdAndUpdate(id, post, { new: true })
    res.json(updatedPost)
}


export const checkPost = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No post with this id")
    try {
        const { id } = req.params;
        const boolean = req.body.boolean
        const post = await Post.findById(id);
        const newPost = { ...post.toObject(), checked: boolean }
        const updatedPost = await Post.findByIdAndUpdate(id, newPost, { new: true })
        res.json(updatedPost)

    } catch (error) {
        console.log(error)
    }

}


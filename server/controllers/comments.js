import mongoose from 'mongoose';
import express from 'express'
import Comments from '../models/comments.js';

export const getComments = async (req, res) => {
    try {
      const { id } = req.params
      const comments = await Comments.find({
          postId: id
      });
      res.json(comments);
    } catch (error) {
      console.log(error)
    }
  }

  export const postComments = async (req, res) => {

    const { id } = req.params
    const { text, image, name, timestamp} = req.body

    const newComment = new Comments({
        postId: id, image, name, text, timestamp
    })

    try {
        await newComment.save();
        const comments = await Comments.find({
            postId: id
        });
        res.status(201).json(comments);
    } catch (error) {
        res.status(409).json({ message: error.message })
    } 
  }

  
  export const deleteComments = async (req, res) => {

    const { id, postId } = req.params

    await Comments.findByIdAndRemove(id);
    const comments = await Comments.find({
        postId: postId
    });
    res.json(comments)

  }
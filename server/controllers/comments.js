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
    const { text, image, name} = req.body

    const newComment = new Comments({
        postId: id, image, name, text
    })

    try {
        await newComment.save();
        res.status(201).json(newComment);
    } catch (error) {
        res.status(409).json({ message: error.message })
    } 
  }
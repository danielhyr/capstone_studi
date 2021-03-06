import express from 'express';

import {getComments, postComments, deleteComments} from '../controllers/comments.js'
import auth from '../middleware/auth.js'

const router = express.Router()


router.get("/:id", getComments)
router.post("/:id", postComments)
router.delete("/:id/:postId", deleteComments)


export default router;
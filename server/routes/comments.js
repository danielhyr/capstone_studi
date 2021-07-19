import express from 'express';

import {getComments, postComments} from '../controllers/comments.js'

const router = express.Router()


router.get("/:id", getComments)
router.post("/:id", postComments)


export default router;
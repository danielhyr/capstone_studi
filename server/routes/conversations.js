import express from 'express';


import { createConvo, getConvo, findconvo } from '../controllers/conversations.js'

import auth from '../middleware/auth.js'


const router = express.Router();

router.post("/", auth, createConvo)
router.get("/:userId", getConvo)
router.get('/find/:firstUserId/:secondUserId', findconvo)

// delete conversation for phase 2
export default router;
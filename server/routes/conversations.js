import express from 'express';


import { createConvo, getConvo, findconvo } from '../controllers/conversations.js'

const router = express.Router();

// 

router.post("/", createConvo)
router.get("/:userId", getConvo)
router.get('/find/:firstUserId/:secondUserId', findconvo)

// delete conversation for phase 2
export default router;
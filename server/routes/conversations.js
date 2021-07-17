import express from 'express';


import { createConvo, getConvo } from '../controllers/conversations.js'

const router = express.Router();

// 

router.post("/", createConvo)
router.get("/:userId", getConvo)

export default router;
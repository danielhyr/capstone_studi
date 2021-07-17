import express from 'express';

import { signin, signup, singleuser, getusers, followusers } from '../controllers/users.js'

const router = express.Router()

router.post('/signin', signin);
router.post('/signup', signup);


router.get('/', getusers)
router.get('/:id', singleuser)
router.put('/follow/:id', followusers)


export default router;
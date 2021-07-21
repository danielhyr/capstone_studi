import express from 'express';

import { signin, signup, singleuser, getusers, followusers, getfollowing, updateuser } from '../controllers/users.js'

import auth from '../middleware/auth.js'

const router = express.Router()
router.post('/signin', signin);
router.post('/signup', signup);
router.get('/', getusers)
router.get('/:id', singleuser)
router.get('/following/:id', auth, getfollowing)
router.put('/follow/:id', auth, followusers)
router.patch('/update/:id',auth,  updateuser)

export default router;
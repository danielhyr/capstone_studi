import express from 'express';

import { signin, signup, singleuser, getusers, followusers, getfollowing, updateuser } from '../controllers/users.js'

const router = express.Router()

router.post('/signin', signin);
router.post('/signup', signup);


router.get('/', getusers)
router.get('/:id', singleuser)
router.get('/following/:id', getfollowing)

router.put('/follow/:id', followusers)
router.patch('/update/:id', updateuser)

export default router;